const { Contact } = require("../../models");
const { statusJoiSchema } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { error } = statusJoiSchema.validate(req.body);
  if (error) {
    error.status = 400;
    error.message = "missing required name field";
    throw error;
  }

  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
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

module.exports = updateStatusContact;
