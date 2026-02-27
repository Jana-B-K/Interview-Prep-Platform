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
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const normalizeOrigin = (origin) => origin.replace(/\/+$/, '');
const isRenderOrigin = (origin) => /^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin);

const allowedOrigins = (process.env.FRONTEND_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173,http://10.0.4.42:5173')
  .split(',')
  .map((origin) => origin.trim())
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalizedOrigin) || isRenderOrigin(normalizedOrigin)) {
        return callback(null, true);
      }

      const err = new Error(`CORS blocked for origin: ${origin}. Add it to FRONTEND_ORIGINS`);
      err.statusCode = 403;
      return callback(err);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/user', authenticate, userRouter);
app.use('/questions',authenticate, questionRouter);
app.use('/progress', authenticate, progressRouter);
app.use(errorHandler);

export default app;
