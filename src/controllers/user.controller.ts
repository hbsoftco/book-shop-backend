import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '@src/models/user.model';
import { IUser } from '@src/interfaces/IUser';

class UserController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const user = new User<IUser>(req.body);
      await user.save();

      res.status(201).json({ message: 'Added successfully' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // If user not found or password doesn't match, return error
      if (!user || !(await compare(password, user.password))) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      // Generate JWT token
      const token = sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: '1h' });

      // Return token
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();

      res.status(201).json({
        message: 'All Users',
        data: users,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async getAllUsers2() {
    console.log('hbsoft controller');
  }
}

export default UserController;
