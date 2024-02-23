import express from 'express';
import { booksRouter } from '../modules/books/books.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/api/books',
    route: booksRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;