import { Router } from 'express';
import UserController from '@src/controllers/user.controller';
class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', UserController.getAllUsers);
  }
}

export default new UserRouter();
