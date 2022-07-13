import Joi from 'joi';

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});

const schemas = {
    userSchema,
};

export default schemas;