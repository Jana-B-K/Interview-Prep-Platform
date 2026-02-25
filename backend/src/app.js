import express from 'express';
import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import questionRouter from './routers/question.router.js';
import progressRouter from './routers/progress.router.js';
import errorHandler from './middlewares/error.middleware.js';
import cors from 'cors';
import { authenticate } from './middlewares/auth.middleware.js';


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/user', authenticate, userRouter);
app.use('/questions',authenticate, questionRouter);
app.use('/progress', authenticate, progressRouter);
app.use(errorHandler);

export default app;
