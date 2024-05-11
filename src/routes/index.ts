import { Application, Router } from 'express';
import userRouter from '@src/routes/user.routes';
import bookRoutes from '@src/routes/book.routes';

class RouterManager {
  static initializeRoutes(app: Application): void {
    const v1Router = Router();

    // v1 routes
    v1Router.use('/users', userRouter.router);
    v1Router.use('/books', bookRoutes.router);

    app.use('/api/v1', v1Router);
  }
}

export default RouterManager;
