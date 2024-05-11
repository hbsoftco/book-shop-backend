import { Router } from 'express';
import UserController from '@src/controllers/user.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', authMiddleware.authenticateToken, UserController.getAllUsers);
  }
}

export default new UserRouter();
