const joi = require('joi');
const BadRequest = require('../../erros/BadRequest');

module.exports = async (req, res, next) => {
  try {
    const autPost = joi.object({
      email: joi.string().email().required().error(new BadRequest('"email" it is invalid')),
      password: joi.string().min(6).required().error(new BadRequest('"passowrd" it is invalid'))
    });
    const { error } = await autPost.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(error.status || 400).json({
      name: error.name,
      description: error.description || error.message
    });
  }
};
