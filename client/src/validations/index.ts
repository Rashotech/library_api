import Joi from "joi";

const userValidation = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required()
});

const borrowBookValidation = Joi.object().keys({
  duration: Joi.number().required(),
  user_id: Joi.string().required(),
  book_id: Joi.string().required()
});

export {
  userValidation,
  borrowBookValidation
};
