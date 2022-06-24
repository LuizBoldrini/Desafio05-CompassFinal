const joi = require('joi');
const { cnpj, zipCode } = require('../../utils/Regex');

module.exports = async (req, res, next) => {
  try {
    const rentalPost = joi.object({
      name: joi.string().min(2).required(),
      cnpj: joi.string().regex(cnpj).required(),
      activities: joi.string().min(5).required(),
      address: joi
        .array()
        .min(1)
        .items({
          zipCode: joi.string().regex(zipCode).required(),
          street: joi.string().min(2),
          complement: joi.string(),
          number: joi.number().min(1).required(),
          city: joi.string().min(1),
          state: joi.string().min(2).max(2),
          isFilial: joi.boolean().required()
        })
    });
    const { error } = await rentalPost.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(error.status || 400).json({
      name: error.name,
      description: error.description || error.message
    });
  }
};
