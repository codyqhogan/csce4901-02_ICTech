const { Router } = require('express');
const joi = require('joi');
const connection = require('../connection');
const { GEN_ERR_BAD_REQUEST, ERR_NOT_FOUND } = require('../ResponseErrors');
const { getUsername } = require('../getToken');

const account = 'user_id, username, firstname, lastname, email, phone, profile_picture, birthdate, city, state';
const router = Router();

const userSchema = joi.object({
  username: joi.string().alphanum().min(3).max(16),
  email: joi.string().email(),
  phone: joi.string().length(10).regex(/[0-9]{10}/),
  profileId: joi.string().regex(/[a-zA-Z0-9-](\.jpg|\.png|\.jpeg)?/),
  birthdate: joi.string().regex(/[12][0-9]{3}-[0-1][0-9]-[0-3][0-9]/),
  city: joi.string().regex(/[A-Za-z]+/),
  state: joi.string().length(2).regex(/[A-Z]{2}/),
});

router.get('/', (req, res) => {
  const {
    mode, offset, page, limit,
  } = req.query;
  let sqlOffset = (Number(offset) || 0);
  sqlOffset += ((Number(page) || 1) - 1) * (Number(limit) || 20);

  const columns = {
    account_details: account,
  }[mode] || '*';
  let limitSql = `LIMIT ${Number(limit) || 20}`;
  if (sqlOffset) {
    limitSql += ` OFFSET ${sqlOffset}`;
  }
  res.contentType('application/vnd.api+json');
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  connection.query(`SELECT ${columns} FROM users ${limitSql}`, (err, result) => {
    if (err) {
      res.status(400);
      jsonResponse.error = {
        status: 400,
        title: 'Bad Request',
        code: err.errno,
        id: err.sqlState,
      };
    } else if (result) {
      jsonResponse.data = {
        type: 'array',
        attributes: result,
      };
    }

    res.json(jsonResponse);
  });
});

router.get('/:userIdString', (req, res) => {
  const { userIdString } = req.params;
  const { mode } = req.query;
  const userId = Number(userIdString);
  const columns = {
    account_details: account,
  }[mode] || '*';

  res.contentType('application/vnd.api+json');
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  if (!userId) {
    res.status(404);
    jsonResponse.error = {
      status: 404,
      title: 'Not Found',
    };
    res.json(jsonResponse);
  } else {
    connection.query(`SELECT ${columns} FROM users WHERE user_id=${userId}`, (err, result) => {
      if (err) {
        res.status(400);
        jsonResponse.error = GEN_ERR_BAD_REQUEST({
          code: err.errno,
          id: err.sqlState,
          message: err.message,
        });
      } else if (!result.length) {
        res.status(404);
        jsonResponse.error = ERR_NOT_FOUND;
      } else if (result.length) {
        jsonResponse.data = {
          id: userId,
          type: 'user',
          attributes: result[0],
        };
      }

      res.json(jsonResponse);
    });
  }
});

router.patch('/', (req, res) => {
  const jsonResponse = {
    links: {
      self: req.originalUrl,
    },
    jsonapi: {
      version: '1.1',
    },
  };

  getUsername(req.headers.authorization).then((username) => {
    if (userSchema.validate(req.body).error) {
      res.status(400).json({ ...jsonResponse, error: { status: 400 } });
      return;
    }
    connection.query(
      `UPDATE users SET ${Object.entries(req.body).map((a) => (a[0] !== 'username') && `${a[0]}='${a[1]}',`).join('').slice(0, -1)} WHERE username=?`,
      [username],
      (err) => {
        if (err) {
          if (err.errno === 1062) {
            res.status(409);
            jsonResponse.error = {
              status: 409,
              title: 'Conflict',
              code: err.errno,
              id: err.sqlState,
              description: err.message,
            };
          } else {
            res.status(400);
            jsonResponse.error = {
              status: 400,
              title: 'Bad Request',
              code: err.errno,
              id: err.sqlState,
              description: `UPDATE users SET ${Object.entries(req.body).map((a) => (a[0] !== 'username') && `${a[0]}='${a[1]}',`).join('').slice(0, -1)} WHERE username=?`,
            };
          }
          res.send(jsonResponse);
        } else {
          connection.query('SELECT user_id FROM users WHERE username=?', username, (errs, results) => {
            res.location(`/users/${results[0].user_id}`);
            res.status(201);
            res.send(jsonResponse);
          });
        }
      },
    );
  });
});

router.post('/', (req, res) => {
  res.status(409).send();
}).post('/:userId', (req, res) => {
  res.status(409).send();
});

router.delete('/', (req, res) => {
  getUsername(req.headers.authorization).then((username) => {
    connection.query('DELETE FROM users WHERE username=?', [username], (err, result) => {
      if (err) {
        res.status(500).json({
          error: { status: 500 },
        });
      } else if (result) {
        res.status(200).send();
      }
      res.status(500).send();
    });
  });
});
module.exports = router;
