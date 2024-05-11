import { Router } from 'express';

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {}
}

export default new UserRouter();
