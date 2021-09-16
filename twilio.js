const twilio = require('twilio');
var accountSid = 'AC6ecdc0f02ad5f1364b231e6e5cb97f3c'; // Your Account SID from www.twilio.com/console
var authToken = 'db6db3f43587b26bdf0dcffffb1b9d60'; //    Your Auth Token from www.twilio.com/console

const client = twilio(accountSid, authToken, {
  lazyLoading: true
});

module.exports = client;