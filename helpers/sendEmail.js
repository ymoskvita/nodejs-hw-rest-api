const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "ymoskvita@gmail.com" };
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendEmail;