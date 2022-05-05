const contactsOperations = require('../../models/contacts');
const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().required(),
});

const add = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    error.message = "missing required name field";
    throw error;
  }
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
