const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const login = require('./login');

require('dotenv').config();

async function getTokenFromBasicAuthorization(authorization) {
  if (!authorization.match(/Basic .+/)) return '';
  const [username, password] = base64.decode(authorization.split(' ')[1]).split(':');
  if (!username || !password) return '';
  const passwordHash = await login.getPasswordHash(username);

  if (await login.comparePasswords(`${username}:${password}`, passwordHash)) {
    const jwtToken = jwt.sign(username, process.env.JWT_SECRET);
    return jwtToken;
  }
  return '';
}

async function getTokenFromBearerAuthorization(authorization) {
  if (!authorization.match(/Bearer .+/)) return '';
  const [, token] = authorization.split(' ');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return token;
  } catch {
    return '';
  }
}

async function getToken(authorization) {
  if (!authorization) return '';
  const basicAuth = await getTokenFromBasicAuthorization(authorization);
  const bearerAuth = await getTokenFromBearerAuthorization(authorization);
  return basicAuth || bearerAuth;
}

async function getUsername(authorization) {
  const token = await getToken(authorization);
  return jwt.decode(token);
}
module.exports = { getToken, getUsername };
