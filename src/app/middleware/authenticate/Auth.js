const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ name: 'tokenError', description: 'Token not provided' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2) return res.status(401).send({ name: 'tokenError', description: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({
      name: 'tokenError',
      description: 'Token is not in a valid format, please try "Bearer (token)"'
    });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ name: 'tokenError', description: 'Invalid Token' });
    req.userId = decoded.id;
  });
  return next();
};
