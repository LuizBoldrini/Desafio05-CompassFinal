const joi = require('joi');
const enuns = require('../../utils/Enuns');

module.exports = async (req, res, next) => {
  try {
    const fleetPost = joi.object({
      id_car: joi.string().required(),
      id_rental: joi.string(),
      status: joi
        .string()
        .valid(...enuns.status)
        .required(),
      daily_value: joi.number().min(1).required(),
      plate: joi.string().required()
    });
    const { error } = await fleetPost.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(error.status || 400).json({
      name: error.name,
      description: error.description || error.message
    });
  }
};
