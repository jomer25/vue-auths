import express from 'express';
import 'dotenv/config';
import users from './routes/user.js';
import { connect } from 'mongoose';

const app = express();

const port = process.env.PORT
const mongodb = process.env.MONGO_URI

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//router
app.use('/api/users', users)

//mongodb
connect(mongodb)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  })
  .catch((error) => {
    console.log(error.message);
  })