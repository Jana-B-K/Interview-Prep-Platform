import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.config.js';
const PORT = process.env.PORT;

console.log("App is loaded")
await connectDB();

app.listen(PORT, () => {
    console.log(`server is live on port http://localhost:${PORT}`)
})