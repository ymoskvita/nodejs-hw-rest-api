const { Schema, model } = require("mongoose");
const Joi = require('joi');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});
const statusJoiSchema = Joi.object({
    favorite: Joi.boolean().required()
})
const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema,
    statusJoiSchema
}