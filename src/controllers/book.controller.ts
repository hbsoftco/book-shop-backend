import { Request, Response } from 'express';
import { Book } from '@src/models/book.model';

class BookController {
  static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await Book.find();

      res.status(200).json({
        message: 'All Books',
        data: books,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default BookController;
