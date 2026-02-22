const express = require("express");
const router = express.Router();
const { checkVitals } = require("../utils/vitalChecker");
const { sendAlertSMS } = require("../services/smsService");
const patients = require("../data/patients");

// Alert history stored in memory
const alertHistory = [];

/**
 * Generate random vital signs
 */
function generateRandomVitals() {
  return {
    hr: Math.floor(Math.random() * 150) + 40, // 40-190 BPM
    temp: (Math.random() * 10 + 95).toFixed(1), // 95-105°F
    spo2: Math.floor(Math.random() * 20) + 80, // 80-100%
    bp: `${Math.floor(Math.random() * 80) + 90}/${Math.floor(Math.random() * 40) + 50}` // Systolic 90-170, Diastolic 50-90
  };
}

/**
 * GET /api/vitals/random/:patientId
 * Generate random vitals for a patient
 * Check thresholds
 * Send SMS if critical/warning
 */
router.get("/random/:patientId", async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    
    // Find patient
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
      const error = new Error(`Patient with ID ${patientId} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Generate random vitals
    const vitals = generateRandomVitals();

    // Check against thresholds
    const vitalCheck = checkVitals(vitals);

    // Send SMS if needed
    let smsSent = false;
    let smsResponse = null;
    
    if (vitalCheck.needsAlert) {
      smsResponse = await sendAlertSMS({
        patientId,
        patientName: patient.name,
        room: patient.room,
        vitals,
        status: vitalCheck.status,
        issues: vitalCheck.issues
      });
      smsSent = smsResponse.success;

      // Store in alert history
      alertHistory.push({
        id: Date.now().toString(),
        patientId,
        patientName: patient.name,
        room: patient.room,
        vitals,
        status: vitalCheck.status,
        issues: vitalCheck.issues,
        smsSent,
        smsDetails: smsResponse,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    res.status(200).json({
      success: true,
      patientId,
      patientName: patient.name,
      room: patient.room,
      vitals,
      status: vitalCheck.status,
      issues: vitalCheck.issues,
      smsSent,
      smsDetails: smsResponse
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = error.statusCode || 500;
    next(err);
  }
});

/**
 * POST /api/vitals/check
 * Check vitals provided in request body
 * Body: { patientId, patientName, room, vitals:{hr,temp,spo2,bp} }
 */
router.post("/check", async (req, res, next) => {
  try {
    const { patientId, patientName, room, vitals } = req.body;

    // Validate input
    if (!patientId || !patientName || !room || !vitals) {
      const error = new Error("Missing required fields: patientId, patientName, room, vitals");
      error.statusCode = 400;
      throw error;
    }

    if (!vitals.hr || !vitals.temp || !vitals.spo2 || !vitals.bp) {
      const error = new Error("Missing vital signs: hr, temp, spo2, bp required");
      error.statusCode = 400;
      throw error;
    }

    // Check against thresholds
    const vitalCheck = checkVitals(vitals);

    // Send SMS if needed
    let smsSent = false;
    let smsResponse = null;

    if (vitalCheck.needsAlert) {
      smsResponse = await sendAlertSMS({
        patientId,
        patientName,
        room,
        vitals,
        status: vitalCheck.status,
        issues: vitalCheck.issues
      });
      smsSent = smsResponse.success;

      // Store in alert history
      alertHistory.push({
        id: Date.now().toString(),
        patientId,
        patientName,
        room,
        vitals,
        status: vitalCheck.status,
        issues: vitalCheck.issues,
        smsSent,
        smsDetails: smsResponse,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    res.status(200).json({
      success: true,
      status: vitalCheck.status,
      issues: vitalCheck.issues,
      smsSent,
      smsDetails: smsResponse,
      alertId: alertHistory.length > 0 ? alertHistory[alertHistory.length - 1].id : null
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = error.statusCode || 500;
    next(err);
  }
});

module.exports = { router, alertHistory };
