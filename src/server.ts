import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './mongodb-config';
import router from './route';

const app: Express = express();
require('dotenv').config();

const PORT = process.env.PORT || 1000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
   res.send('Hello World!');
});

app.listen(PORT, () => {
   console.log(`Listening on http://localhost:${PORT}`);
   connectDB();
});

export default app;
