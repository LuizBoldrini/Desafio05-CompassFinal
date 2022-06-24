const joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const carPatch = joi.object({
      description: joi.string().min(3)
    });
    const { error } = await carPatch.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(error.status || 400).json({
      name: error.name,
      description: error.description || error.message
    });
  }
};
