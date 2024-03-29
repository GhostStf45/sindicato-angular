const functions = require("firebase-functions");

const nodemailer = require("nodemailer");
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);

const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


// eslint-disable-next-line max-len
exports.sendContactMessage = functions.database.ref("/messages/{pushKey}").onWrite((event) => {
  const snapshot = event.data;// Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }
  const val = snapshot.val();
  const mailOptions = {
    to: "test@example.com",
    subject: `Information Request from ${val.name}`,
    html: val.html,
  }; return mailTransport.sendMail(mailOptions)
      .then(() => {
        return console.log("Mail sent to: test@example.com");
      });
});

// const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
