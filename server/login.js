const bcrypt = require('bcrypt');
const connection = require('./connection');

require('dotenv').config();

const saltRounds = 10;

const hashPassword = async (input) => {
  const salt = await bcrypt.genSalt(saltRounds, 'a');
  const hash = await bcrypt.hash(input, salt);

  return hash;
};

const createUser = async (data = {}) => {
  const { username, password } = data;
  const postedData = data;
  const hash = await hashPassword(`${username}:${password}`);
  postedData.password = hash;
  return new Promise((resolve) => {
    const categories = `(${Object.keys({ ...data }).join(', ')})`;
    const placeholders = categories.replaceAll(/\w+/g, '?');

    connection.query(`INSERT INTO users ${categories} VALUES ${placeholders}`, [...Object.values(postedData)], (error, result) => {
      resolve(error ? { error } : { data: result });
    });
  });
};

const updateUserPassword = async (username, password) => {
  const hash = await hashPassword(`${username}:${password}`);
  return new Promise((resolve) => {
    connection.query('UPDATE users SET password=? WHERE username=?', [hash, username], (error, result) => {
      resolve(error ? { error } : { data: result });
    });
  });
};

const comparePasswords = async (input, hash) => bcrypt.compare(input, hash);

const getPasswordHash = async (username) => {
  const passwordHash = new Promise((resolve) => {
    connection.query('SELECT password FROM users WHERE username=?', [username], (err, results) => {
      if (!err && results && results.length) resolve(results[0].password);
      else resolve('');
    });
  });
  return passwordHash;
};

module.exports = {
  comparePasswords,
  getPasswordHash,
  hashPassword,
  createUser,
  updateUserPassword,
};
