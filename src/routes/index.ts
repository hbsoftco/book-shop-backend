import { Application, Router } from 'express';
import userRouter from '@src/routes/user.routes';

class RouterManager {
  static initializeRoutes(app: Application): void {
    const v1Router = Router();

    // v1 routes
    v1Router.use('/users', userRouter.router);

    app.use('/api/v1', v1Router);
  }
}

export default RouterManager;
