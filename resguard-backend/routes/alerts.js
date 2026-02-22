const express = require("express");
const router = express.Router();
const { alertHistory } = require("./vitals");

/**
 * GET /api/alerts/history
 * Get last 50 alerts (all alerts in memory)
 */
router.get("/history", (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = alertHistory.slice(-limit);
    
    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
});

/**
 * GET /api/alerts/active
 * Get only unresolved alerts
 */
router.get("/active", (req, res) => {
  try {
    const activeAlerts = alertHistory.filter(alert => !alert.resolved);
    
    res.status(200).json({
      success: true,
      count: activeAlerts.length,
      data: activeAlerts
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
});

/**
 * DELETE /api/alerts/:id
 * Mark alert as resolved
 */
router.delete("/:id", (req, res, next) => {
  try {
    const alertId = req.params.id;
    const alert = alertHistory.find(a => a.id === alertId);

    if (!alert) {
      const error = new Error(`Alert with ID ${alertId} not found`);
      error.statusCode = 404;
      throw error;
    }

    alert.resolved = true;
    alert.resolvedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: `Alert ${alertId} marked as resolved`,
      data: alert
    });
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = error.statusCode || 500;
    next(err);
  }
});

module.exports = router;
