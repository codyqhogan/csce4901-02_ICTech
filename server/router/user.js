import express from "express";
import { User } from '../server.js';

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  if(req.body.name) {
    const created = await User.create(req.body);
    res.location(`/${created._id}`);
    res.statusCode = 201;
  } else {
    res.statusCode = 400;
  }
  // User.create();
  res.send();
});

userRouter.post('/:id', async (req, res) => {
  res.statusCode = 404;
  try {
    if(await User.findById(req.params.id)) res.statusCode = 409;
  } catch {}
  res.send();
});

userRouter.get('/', async (req, res) => {
  res.send(await User.find({}));
})

userRouter.get('/:id', async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
  } catch {}
  res.statusCode = user ? 200 : 404;
  res.send(user);
})

userRouter.patch('/', async (req, res) => {
  res.statusCode = 405;
  res.send();
});

userRouter.patch('/:id', async (req, res) => {
  try {
    if(req.body.name) {
      const created = await User.findByIdAndUpdate(req.params.id, req.body);
      if(created) {
        res.send(await User.findById(req.params.id));
      } else {
        res.statusCode = 404;
      }
    } else {
      res.statusCode = 400;
    }
  } catch {
    res.statusCode = 404;
  }
  // User.create();
  res.send();
})

userRouter.delete('/', async (req, res) => {
  res.statusCode = 405;
  res.send();
});

userRouter.delete('/:id', async (req, res) => {
  res.statusCode = 404;
  try {
    if(await User.findByIdAndDelete(req.params.id)) res.statusCode = 200;
  } catch {}
  res.send();
})
export default userRouter;