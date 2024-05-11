import express, { json, urlencoded } from 'express';
import { Logger } from './utils/logger';
import RouterManager from './routes';
class Server {
  private app: express.Application;
  private port: string | number;

  private logger = Logger.getInstance();

  constructor(port: string | number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
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
