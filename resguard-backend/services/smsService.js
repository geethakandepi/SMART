const twilio = require("twilio");
require("dotenv").config();

const smsCooldown = new Map();
const COOLDOWN_DURATION = 60 * 60 * 1000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;
const toPhone = process.env.DOCTOR_PHONE_NUMBER;

const hasTwilioCredentials = accountSid && authToken && fromPhone && toPhone;
let twilioClient = null;

/* ---------- INIT ---------- */

if (hasTwilioCredentials) {
  twilioClient = twilio(accountSid, authToken);
  console.log("Twilio READY");
  console.log("From:", fromPhone);
  console.log("To:", toPhone);
} else {
  console.log("Missing Twilio credentials → TEST MODE");
}

/* ---------- COOLDOWN ---------- */

function canSendSMS(patientId) {
  const last = smsCooldown.get(patientId);
  if (!last) return true;
  return Date.now() - last >= COOLDOWN_DURATION;
}

/* ---------- MESSAGE BUILDER ---------- */

function buildMessage({ patientName, vitals }) {
  // Short + carrier safe + trial safe
  return `ALERT ${patientName} HR:${vitals.hr} SpO2:${vitals.spo2}`;
}

/* ---------- MAIN FUNCTION ---------- */

async function sendAlertSMS(patientData) {
  const { patientId, status } = patientData;

  if (status !== "Critical") {
    return { success: false, message: "Only Critical sends SMS" };
  }

  if (!canSendSMS(patientId)) {
    return {
      success: false,
      message: "Cooldown active",
      reasonCode: "COOLDOWN",
    };
  }

  const body = buildMessage(patientData);

  console.log("SMS LENGTH:", body.length);
  console.log("SMS TEXT:", body);

  /* ---------- REAL SMS ---------- */

  if (twilioClient) {
    try {
      const msg = await twilioClient.messages.create({
        body,
        from: fromPhone,
        to: toPhone,
      });

      smsCooldown.set(patientId, Date.now());

      console.log("SMS SENT | SID:", msg.sid);

      return {
        success: true,
        provider: "twilio",
        sid: msg.sid,
        status: msg.status,
      };
    } catch (err) {
      console.error("Twilio Error:", err.message);

      return {
        success: false,
        error: err.message,
        code: err.code || "TWILIO_ERROR",
      };
    }
  }

  /* ---------- TEST MODE ---------- */

  console.log("TEST MODE SMS:", body);

  smsCooldown.set(patientId, Date.now());

  return {
    success: true,
    provider: "console",
    message: "SMS logged (test mode)",
  };
}

/* ---------- EXPORT ---------- */

module.exports = {
  sendAlertSMS,
  canSendSMS,
  smsCooldown,
  COOLDOWN_DURATION,
};