import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


const sendEmail = async (to, subject, html) => {
    const mailOptions = {from: process.env.EMAIL, to, subject, html,};

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    } 
    catch (error) {
        console.error("Error sending email : ", error);
        return false;
    }
}


export default sendEmail;