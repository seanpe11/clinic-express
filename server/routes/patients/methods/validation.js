'use strict';

const Joi = require('joi');

function createValidateBody (body) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(30).empty().required(),
        age: Joi.number().required(),
        sex: Joi.string().required().empty(),
        street: Joi.string().min(8).max(50).empty().required(),
        city: Joi.string().min(8).max(50).empty().required(),
        province: Joi.string().min(8).max(50).empty().required(),
        occupation: Joi.string()
    });
    return schema.validate(body);
}

function updateValidateBody (body) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(30).empty(),
        age: Joi.number(),
        sex: Joi.string().empty(),
        street: Joi.string().min(8).max(50).empty(),
        city: Joi.string().min(8).max(50).empty(),
        province: Joi.string().min(8).max(50).empty(),
        occupation: Joi.string()
    });
    return schema.validate(body);
}

module.exports.createValidateBody = createValidateBody;
module.exports.updateValidateBody = updateValidateBody;