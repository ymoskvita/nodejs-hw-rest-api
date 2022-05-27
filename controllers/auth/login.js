const { Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { joiLoginSchema } = require('../../models/user');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required field";
      throw error;
    };

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passCompare) {
        throw new Unauthorized('Email or password is wrong')
    };

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
}

module.exports = login;
