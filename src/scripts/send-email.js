require('dotenv').config();
const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
const fs = require('fs');
const path = require('path');
const google = require('google-auth-library');

// Replace these with your actual credentials
const CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_OAUTH_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_OAUTH_REFRESH_TOKEN;

// Sender email credentials
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Path to MJML file
const mjmlFilePath = path.resolve(
  __dirname,
  '../templates/welcome-letter.mjml'
);

// Read MJML file content
const mjmlTemplate = fs.readFileSync(mjmlFilePath, 'utf-8');

// Compile MJML to HTML
const { html, errors } = mjml2html(mjmlTemplate);

// Log MJML compilation errors, if any
if (errors.length > 0) {
  console.error('MJML Errors:', errors);
}

async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        pass: EMAIL_PASS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: 'sbu7032@gmail.com',
      to: 'sbu7032@gmail.com',
      subject: 'Test Email',
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendMail();
