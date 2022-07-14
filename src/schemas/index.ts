import Joi from 'joi';

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});

const credentialSchema = Joi.object().keys({
    url: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
});

const schemas = {
    userSchema,
    credentialSchema,
};

export default schemas;