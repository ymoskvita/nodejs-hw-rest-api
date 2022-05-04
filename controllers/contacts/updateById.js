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

const updateById = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    error.message = "missing required name field";
    throw error;
  }
  const { contactId } = req.params;
  const result = await contactsOperations.updateById(contactId, req.body);
  if (!result) {
    const error = new Error(`Contact with id:${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateById;
