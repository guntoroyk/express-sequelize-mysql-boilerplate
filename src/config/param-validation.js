import Joi from '@hapi/joi';

export default {
    authLogin: {
        body: Joi.object({
            nopeg: Joi.string().required(),
            password: Joi.string().required(),
        }),
    },

    createCity: {
        body: Joi.object({
            name: Joi.string().required(),
        }),
    },

    updateCity: {
        body: Joi.object({
            name: Joi.string().required(),
        }),
    },
};
