const express = require("express");
const router = express.Router();
const patients = require("../data/patients");

/**
 * GET /api/patients
 * Return all patients
 */
router.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
});

/**
 * GET /api/patients/:id
 * Return single patient by ID
 */
router.get("/:id", (req, res, next) => {
  try {
    const patientId = req.params.id;
    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
      const error = new Error(`Patient with ID ${patientId} not found`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = error.statusCode || 500;
    next(err);
  }
});

module.exports = router;
