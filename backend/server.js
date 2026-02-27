import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.config.js';
const PORT = Number(process.env.PORT) || 4029;
const HOST = process.env.HOST || '0.0.0.0';

console.log('App is loaded');

app.listen(PORT, HOST, () => {
  console.log(`server is live on http://${HOST}:${PORT}`);
});

void connectDB().catch(() => {
  // Keep process alive so Render can continue port checks and logs remain available.
});
