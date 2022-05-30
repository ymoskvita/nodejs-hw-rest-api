const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const verify = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      const error = new Error(`Email or password invalid`);
      error.status = 401;
      throw error;
    }
    if (user.verify) {
      const error = new Error(`Verification has already been passed`);
      error.status = 400;
      throw error;
    }
    const mail = {
        to: email,
        subject: "Confirm Your Email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm Your Email</a>`
    };
    await sendEmail(mail)
    res.json({
        message: 'Verification email sent'
    })
};

module.exports = verify;