const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PersonRepository = require('../repository/PersonRepository');
const NotFound = require('../erros/NotFound');
const CpfFormat = require('../utils/CpfFormat');
const authConfig = require('../config/authConfig.json');
const BadRequest = require('../erros/BadRequest');
require('dotenv').config();

class AuthenticateService {
  async acess(email, password) {
    const user = await PersonRepository.findPeopleByEmail(email);

    if (!user) {
      throw new NotFound('User');
    }
    const { canDrive } = user;

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequest('"password" is incorrect');
    }
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret || process.env.JWT_SECRET, {
      expiresIn: 86400
    });

    CpfFormat(user);
    return { canDrive, email, token };
  }
}

module.exports = new AuthenticateService();
