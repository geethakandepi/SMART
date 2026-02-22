/**
 * Check vital signs against clinical thresholds
 * Returns status (Critical, Warning, Normal) and issues
 */

const vitalThresholds = {
  HR: {
    critical: { min: 0, max: 49, minHigh: 121, maxHigh: 300 },
    warning: { min: 50, max: 59, minHigh: 101, maxHigh: 120 },
    normal: { min: 60, max: 100 }
  },
  temp: {
    critical: { min: -50, max: 96.9, minHigh: 103.1, maxHigh: 150 },
    warning: { min: 97, max: 99.5, minHigh: 99.6, maxHigh: 103 },
    normal: { min: 97, max: 99.5 }
  },
  SpO2: {
    critical: { min: 0, max: 89 },
    warning: { min: 90, max: 94 },
    normal: { min: 95, max: 100 }
  },
  BP: {
    critical: { systolic: 160 },
    warning: { systolic: 140 },
    normal: { systolic: 139 }
  }
};

function checkVitals(vitals) {
  const issues = [];
  let overallStatus = "Normal";

  // Check Heart Rate
  const hr = parseFloat(vitals.hr);
  if (hr < 50 || hr > 120) {
    if (hr < 50 || hr > 120) {
      issues.push(`⚠️ HR CRITICAL: ${hr} BPM (Normal: 60-100)`);
      overallStatus = "Critical";
    }
  } else if ((hr >= 50 && hr < 60) || (hr > 100 && hr <= 120)) {
    issues.push(`⚠️ HR Warning: ${hr} BPM (Normal: 60-100)`);
    if (overallStatus !== "Critical") overallStatus = "Warning";
  }

  // Check Temperature
  const temp = parseFloat(vitals.temp);
  if (temp > 103) {
    issues.push(`🌡️ TEMP CRITICAL: ${temp}°F (Normal: 97-99.5°F)`);
    overallStatus = "Critical";
  } else if ((temp >= 99.6 && temp <= 103) || (temp < 97)) {
    issues.push(`🌡️ TEMP Warning: ${temp}°F (Normal: 97-99.5°F)`);
    if (overallStatus !== "Critical") overallStatus = "Warning";
  }

  // Check SpO2 (Oxygen Saturation)
  const spo2 = parseFloat(vitals.spo2);
  if (spo2 < 90) {
    issues.push(`💨 SpO2 CRITICAL: ${spo2}% (Normal: 95-100%)`);
    overallStatus = "Critical";
  } else if (spo2 >= 90 && spo2 < 95) {
    issues.push(`💨 SpO2 Warning: ${spo2}% (Normal: 95-100%)`);
    if (overallStatus !== "Critical") overallStatus = "Warning";
  }

  // Check Blood Pressure (Systolic)
  const bpSystolic = parseInt(vitals.bp.split("/")[0]);
  if (bpSystolic > 160) {
    issues.push(`💓 BP CRITICAL: ${vitals.bp} (Normal: 90-139 systolic)`);
    overallStatus = "Critical";
  } else if (bpSystolic >= 140 && bpSystolic <= 160) {
    issues.push(`💓 BP Warning: ${vitals.bp} (Normal: 90-139 systolic)`);
    if (overallStatus !== "Critical") overallStatus = "Warning";
  }

  return {
    status: overallStatus,
    issues: issues,
    needsAlert: overallStatus === "Critical" || overallStatus === "Warning"
  };
}

module.exports = {
  checkVitals,
  vitalThresholds
};
