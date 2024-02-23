import express from 'express';
import {
   createBookController,
   getBooksController,
   getBookById,
   deleteBookById,
   updateBookById,
   addReviewToBook,
} from './books.controller';

const router = express.Router();


router.post('/', createBookController);

router.get('/', getBooksController);

router.get('/:id', getBookById);

router.delete('/:id', deleteBookById);

router.put('/:id', updateBookById);

router.put('/:id/reviews', addReviewToBook);


export const booksRouter = router;


