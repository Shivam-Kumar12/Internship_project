import 'express-async-errors';
import * as dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import express from 'express';

// Create Express app
const app = express();
import morgan from 'morgan';
import jobRoutes from "./router/jobRoutes.js";
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from "./router/authRouter.js";
import { authenticateUser } from "./middleware/authMiddleWare.js";
import cookieParser from 'cookie-parser';
import userRouter from "./router/userRouter.js"

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";


const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, "./client/dist")))

//Cloudinary
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,

})





// Middleware
if (process.env.NODE_ENV === 'development') {
  // Logging middleware for development environment
  app.use(morgan('dev'));
}
app.use(cookieParser())
app.use(express.json());
// Routes
app.get('/', (req, res) => {
  res.send("Hello World");
});
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use('/api/v1/jobs', authenticateUser, jobRoutes);
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)


app.get('*', (req, res) => {

  res.sendFile(path.resolve(__dirname, "./client/dist", 'index.html'))
})

// 404 Route
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// Connect to MongoDB and start server
const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}



//FOR TESTING PURPOSE
// import { validateTest } from './middleware/validationMiddleware.js';
// app.post('/api/v1/test',
//   validateTest ,
//   (req, res, next) => {
//   const {name}=req.body;
//   res.json({message:`hello ${name}`})


//   });