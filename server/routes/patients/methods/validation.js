'use strict';

const Joi = require('joi');

function createValidateBody (body) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(30).empty().required(),
        age: Joi.number().required(),
        sex: Joi.string().required().empty(),
        address: Joi.string().min(8).max(50).empty().required(),
        occupation: Joi.string()
    });
    return schema.validate(body);
}

function updateValidateBody (body) {
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(30).empty(),
        age: Joi.number(),
        sex: Joi.string().empty(),
        address: Joi.string().min(8).max(50).empty(),
        occupation: Joi.string()
    });
    return schema.validate(body);
}

module.exports.createValidateBody = createValidateBody;
module.exports.updateValidateBody = updateValidateBody;