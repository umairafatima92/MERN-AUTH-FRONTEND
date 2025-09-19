import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SMTP_HOST, process.env.SMTP_MAIL, process.env.SMTP_SERVICE, process.env.SMTP_PASS, process.env.SMTP_PORT)

   const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  })

export default transporter;