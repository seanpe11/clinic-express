'use strict';

const Joi = require('joi');

function createValidateBody (body) {
    const schema = Joi.object().keys({
      name: Joi.string().min(2).max(30).empty().required(),
      sex: Joi.string().required().empty(),
      address: Joi.array().items(Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
      })),
      contact_number: Joi.string().required(),
      date_of_birth: Joi.date().required(),
      marital_status: Joi.string().required(),
      height: Joi.string().required(),
      previous_names: Joi.array().items(Joi.string())
    });
    return schema.validate(body);
}


function updateValidateBody (body) {
    const schema = Joi.object().keys({
      name: Joi.string().min(2).max(30).empty().required(),
      sex: Joi.string().required().empty(),
      address: Joi.array().items(Joi.object({
        _id: Joi.allow(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
      })),
      contact_number: Joi.string().required(),
      date_of_birth: Joi.date().required(),
      marital_status: Joi.string().required(),
      height: Joi.string().required(),
      previous_names: Joi.array().items(Joi.string()),
      createdAt: Joi.allow(),
      updatedAt: Joi.allow(),
      _id: Joi.allow(),
      __v: Joi.allow(),
      visits: Joi.allow()
    });
    return schema.validate(body);
}

module.exports.createValidateBody = createValidateBody;
module.exports.updateValidateBody = updateValidateBody;