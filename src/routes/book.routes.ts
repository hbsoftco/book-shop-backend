import { Router } from 'express';
import BookController from '@src/controllers/book.controller';

class BookRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', BookController.getAllBooks);
  }
}

export default new BookRouter();
