const nodemailer = require('nodemailer');
require('dotenv').config();
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECTURI
);


 
// Function to send an email
const sendMail = async (to, subject, text) => {

    try {
      oAuth2Client.setCredentials({ refresh_token: process.env.REFRESHTOKEN });

const accesToken = await oAuth2Client.getAccessToken();

// Create a transporter object using SMTP transport
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESHTOKEN,
    accessToken: accesToken.token,
  },
});


        await transport.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text
        });
        return true;
        
       
     
    } catch (error) {
      return false;
        console.error('Error sending email:', error);
    }
};

module.exports = sendMail;
