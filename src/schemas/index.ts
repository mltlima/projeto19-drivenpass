import Joi from 'joi';
import date from '@joi/date'
const joi = Joi.extend(date);

const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
});

const credentialSchema = Joi.object().keys({
    url: Joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
});

const safenoteSchema = Joi.object().keys({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required(),
});

const cardSchema = Joi.object().keys({
    label: Joi.string().required(),
    number: Joi.string().required(),
    nameInCard: Joi.string().required(),
    securityCode: Joi.string().length(3).required(),
    expirationDate: joi.date().format(['MM/YY', 'MM-YY']).required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid('credit', 'debit', 'creditAndDebit').required(),
});

const wifiSchema = Joi.object().keys({
    ssid: Joi.string().required(),
    password: Joi.string().required(),
    label: Joi.string().required(),
});

const documentSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    emissionDate: joi.date().format(['DD/MM/YYYY', 'DD-MM-YYYY']).required(),
    expiryDate: joi.date().format(['DD/MM/YYYY', 'DD-MM-YYYY']).required(),
    registrationNumber: Joi.string().required(),
    issuingAuthority: Joi.string().required(),
    type: Joi.string().valid('RG', 'CNH').required(),
});

const schemas = {
    userSchema,
    credentialSchema,
    safenoteSchema,
    cardSchema,
    wifiSchema,
    documentSchema
};

export default schemas;