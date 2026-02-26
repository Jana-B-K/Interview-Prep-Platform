import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.config.js';
const PORT = process.env.PORT;
const HOST = process.env.HOST || '0.0.0.0';

console.log("App is loaded")
await connectDB();

app.listen(PORT, HOST, () => {
    console.log(`server is live on http://${HOST}:${PORT}`)
})
