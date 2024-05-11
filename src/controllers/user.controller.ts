import { Request, Response } from 'express';

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // const books = await User.find();
      const books = await [{ name: 'hossein' }];

      res.status(200).json({
        message: 'All Users',
        data: books,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default UserController;
