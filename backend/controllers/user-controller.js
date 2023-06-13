import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: '3d'})
}

const userLogin = async (req, res) => {
  try {
    const {email,password} = req.body
    const user = await User.login(email, password)
    const token = createToken(user._id)

    return res.status(201).json({email, token})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

const userSignup = async (req, res) => {
  try {
    const {email,password} = req.body
    const user = await User.signup(email, password)
    const token = createToken(user._id)

    return res.status(201).json({email, token})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

export {
  userLogin,
  userSignup,
}