const joi = require('joi').extend(require('@joi/date'));
const validData = require('../../utils/ValidaData');
const enuns = require('../../utils/Enuns');

module.exports = async (req, res, next) => {
  try {
    const personGet = joi.object({
      name: joi.string().min(4),
      cpf: joi.string(),
      birthDay: joi.date().format('DD/MM/YYYY').max(validData()),
      email: joi.string().email(),
      password: joi.string().min(6),
      canDrive: joi.string().valid(...enuns.canDrive)
    });
    const { error } = await personGet.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(error.status || 400).json({
      name: error.name,
      description: error.description || error.message
    });
  }
};
