import { Request, Response } from 'express';
import {
   createBook,
   deleteBook,
   getBook,
   getBooks,
   updateBook,
} from './books.service';
import { BookModel } from './books.model';
import { api } from '@opentelemetry/sdk-node';
import { span } from '../../span';

// Create book controller
export async function createBookController(req: Request, res: Response) {
   api.context.with(api.trace.setSpan(api.context.active(), span), async () => {
      try {
         const newBook = await createBook(req.body);
         res.status(201).json({
            message: 'Book created successfully',
            book: newBook,
         });
         span.setStatus({ code: api.SpanStatusCode.OK });
      } catch (error) {
         res.status(500).json({
            error: 'Failed to create the book.',
            message: error.message,
         });
         span.setStatus({
            code: api.SpanStatusCode.ERROR,
            message: error.message,
         });
      } finally {
         span.end();
      }
   });
}

// Get books controller
export async function getBooksController(req: Request, res: Response) {
   try {
      const { title, author, genre, publicationYear } = req.query;
      const query: any = {};
      if (title) query.title = { $regex: title.toString(), $options: 'i' };
      if (author) query.author = { $regex: author.toString(), $options: 'i' };
      if (genre) query.genre = { $regex: genre.toString(), $options: 'i' };
      if (publicationYear) {
         const startDate = new Date(parseInt(publicationYear.toString()), 0, 1);
         const endDate = new Date(
            parseInt(publicationYear.toString()) + 1,
            0,
            1,
         );
         query.publicationDate = { $gte: startDate, $lt: endDate };
      }

      const books = await getBooks(query);
      res.json({ message: 'Books retrieved successfully', books: books });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Failed to retrieve books',
         message: error.message,
      });
   }
}

// Get book by id controller
export async function getBookById(req: Request, res: Response) {
   try {
      const book = await getBook(req.params.id);
      res.json({ message: 'Book retrieved successfully', book: book });
   } catch (error) {
      res.status(500).json({
         error: 'Failed to retrieve book',
         message: error.message,
      });
   }
}

// Delete book by id controller
export async function deleteBookById(req: Request, res: Response) {
   try {
      const book = await deleteBook(req.params.id);
      res.json({ message: 'Book deleted successfully', book: book });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Failed to delete book',
         message: error.message,
      });
   }
}

// Update book by id controller
export async function updateBookById(req: Request, res: Response) {
   try {
      const book = await updateBook(req.params.id, req.body);
      res.json({ message: 'Book updated successfully', book: book });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Failed to update book',
         message: error.message,
      });
   }
}

// Add reviews to book controller
export async function addReviewToBook(req: Request, res: Response) {
   try {
      const book = await BookModel.findById(req.params.id);
      book.reviews.push(req.body.reviews);
      await book.save();
      res.json({ message: 'Review added successfully', book: book });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Failed to add review',
         message: error.message,
      });
   }
}
