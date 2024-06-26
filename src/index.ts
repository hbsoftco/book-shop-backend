import { config } from 'dotenv-safe';
import express, { json, urlencoded } from 'express';
import { ConnectOptions } from 'mongoose';
import { Logger } from './utils/logger';
import RouterManager from './routes';
import Database from './utils/mongo';
config();

class Server {
  private app: express.Application;
  private port: string | number;

  private logger = Logger.getInstance();

  constructor(port: string | number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.connectToDatabase();
  }

  private connectToDatabase(): void {
    const uri = process.env.MONGO_URL;
    const options: ConnectOptions = {};

    const db = Database.getInstance(uri!, options);
    db.connect();
  }

  private initializeMiddlewares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(this.logger.getHttpLogger());
  }

  private initializeRoutes(): void {
    RouterManager.initializeRoutes(this.app);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      this.logger.info(`Server is running on http://localhost:${this.port}`);
    });
  }
}

const PORT = process.env.APP_PORT ?? 5000;

const server = new Server(PORT);
server.listen();
