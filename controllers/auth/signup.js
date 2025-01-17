const { Conflict } = require('http-errors');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { joiSignupSchema } = require('../../models/user');
const { genSaltSync } = require('bcrypt');

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
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, genSaltSync(10));
    await User.create({ avatarURL, email, password: hashPassword, subscription });
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                avatarURL,
                email,
                subscription
            }
        }
    })
};

module.exports = signup;