const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEMail = async (data) => {
    const email = { ...data, from: UKR_NET_EMAIL };
    await transport.sendMail(email);
    return true;
}

module.exports = sendEMail;

// const email = {
//   to: "rayagi1138@kkoup.com",
//   from: "alexon7@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong>from localhost:3000</p>"
// };

// transport.sendMail(email)
// .then(()=> console.log("Email send success"))
//     .catch(error => console.log(error.message));