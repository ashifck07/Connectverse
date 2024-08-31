const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: message, // Use HTML to include clickable links
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

