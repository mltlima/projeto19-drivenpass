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

const safenoteSchema = Joi.object().keys({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required(),
});

const schemas = {
    userSchema,
    credentialSchema,
    safenoteSchema,
};

export default schemas;