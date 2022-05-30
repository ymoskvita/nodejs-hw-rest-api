const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const { genSaltSync } = require('bcrypt');
const { nanoid } = require('nanoid');

const { User } = require('../../models');
const { joiSignupSchema } = require('../../models/user');
const { sendEmail } = require('../../helpers');

const signup = async (req, res) => {
  const { error } = joiSignupSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required field";
      throw error;
    };
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exist`)
    }

    const hashPassword = bcrypt.hashSync(password, genSaltSync(10));
    const verificationToken = nanoid();
    await User.create({ email, password: hashPassword, subscription, verificationToken });
    const mail = {
        to: email,
        subject: "Confirm Your Email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm Your Email</a>`
    };
    await sendEmail(mail);

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription,
                verificationToken
            }
        }
    })
};

module.exports = signup;