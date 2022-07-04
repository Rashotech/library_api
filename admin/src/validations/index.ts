import Joi from "joi";

const addBookvalidation = Joi.object().keys({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  publisher: Joi.string().required()
});

const borrowBookvalidation = Joi.object().keys({
  duration: Joi.number().required()
});

export {
  addBookvalidation,
  borrowBookvalidation
};
