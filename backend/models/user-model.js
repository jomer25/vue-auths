import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const { statics } = userSchema

statics.signup = async function(email, password) {
  if(!email || !password) {
    throw new Error('Please provide both email and password.')
  }

  if(!validator.isEmail(email)) {
    throw new Error('Invalid email format.')
  }

  if(!validator.isStrongPassword(password)) {
    throw new Error('Password should be at least 8 characters long and contain a combination of uppercase, lowercase, numeric, and special characters.')
  }

  const exists = await this.findOne({ email })

  if(exists) {
    throw new Error('User already exists with the provided email.')
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await this.create({ email, password: hashPassword })

  return user
}

statics.login = async function(email, password) {
  if(!email || !password) {
    throw new Error('Please provide both email and password.')
  }

  const user = await this.findOne({ email })

  if(!user) {
    throw new Error('Invalid email or password.')
  }

  const matchPassword = await bcrypt.compare(password, user.password)

  if(!matchPassword) {
    throw new Error('Invalid email or password.')
  }

  return user
}

export default model('User', userSchema)
