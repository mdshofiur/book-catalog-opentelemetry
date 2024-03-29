import { api } from '@opentelemetry/sdk-node';
import { IBook } from './books.interfaces';
import { BookModel } from './books.model';
import { tracer } from '../../span';
import opentelemetry from '@opentelemetry/api';

/* -------------------------------------------------------------------------- */
/*                            Create a Book service                           */
/* -------------------------------------------------------------------------- */
export async function createBook(book: IBook, parent: any) {
   const ctx = opentelemetry.trace.setSpan(
      opentelemetry.context.active(),
      parent,
   );
   const dbSpan = tracer.startSpan('db-operation', undefined, ctx);
   try {
      const bookEntry = await BookModel.create(book);
      dbSpan.setStatus({ code: api.SpanStatusCode.OK });
      return bookEntry;
   } catch (error) {
      dbSpan.setStatus({
         code: api.SpanStatusCode.ERROR,
         message: error.message,
      });
      throw new Error(`Failed to create book: ${error.message}`);
   } finally {
      dbSpan.end();
   }
}

/* -------------------------------------------------------------------------- */
/*                             Get Books service                             */
/* -------------------------------------------------------------------------- */
export async function getBooks(query: any) {
   const books = await BookModel.find(query);
   return books;
}

/* -------------------------------------------------------------------------- */
/*                             Get Book service                              */
/* -------------------------------------------------------------------------- */

export async function getBook(id: string) {
   const book = BookModel.findById(id);
   return book;
}

/* -------------------------------------------------------------------------- */
/*                             Delete Book service                           */
/* -------------------------------------------------------------------------- */

export async function deleteBook(id: string) {
   const book = BookModel.findByIdAndDelete(id);
   return book;
}

/* -------------------------------------------------------------------------- */
/*                             Update Book service                           */
/* -------------------------------------------------------------------------- */

export async function updateBook(id: string, book: IBook) {
   const updateBook = BookModel.updateOne({ _id: id }, book);
   return updateBook;
}
