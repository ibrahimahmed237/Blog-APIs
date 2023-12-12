const joi = require("joi");
const errText = require("./error-text.js");

module.exports = (post) => {
  const postSchema = joi
    .object({
      title: joi.string().trim().min(5).max(100).required(),
      content: joi.string().trim().min(5).max(1000).required(),
    })
    .unknown();
  let { value, error } = postSchema.validate(post, { abortEarly: false });
  if (error) error = errText(error);
  return { value, error };
};
