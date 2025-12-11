import express from 'express';
import cors from 'cors';
import postgres from 'pg';
import { initDatabase } from './src/services/articleJob.js'; 
import articlesRouter from './src/routes/articleRoutes.js';
import "./scheduler.js";

const { Pool } = postgres;

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
};

const pool = new Pool({
  ...config, // spread operator
  port: 5432,
});

await initDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/articles', articlesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export { app, pool };