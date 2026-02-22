require('dotenv').config();
const { sendAlertSMS } = require('./services/smsService');

sendAlertSMS({
  patientId: '101121356',
  patientName: 'John Doe',
  room: 'ICU-A BED 101',
  vitals: { hr: 130, temp: 103.5, spo2: 85, bp: '170/100' },
  status: 'Critical',
  issues: ['HR CRITICAL']
}).then(r => {
  console.log('RESULT:', JSON.stringify(r, null, 2));
});