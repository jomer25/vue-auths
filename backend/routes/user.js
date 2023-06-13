import express from 'express';
import {
  userLogin,
  userSignup,
} from '../controllers/user-controller.js'

const router = express.Router();

router
  .post('/login', userLogin)
  .post('/signup', userSignup);

export default router;