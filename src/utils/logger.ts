import { pino } from 'pino';
import { pinoHttp } from 'pino-http';
import { NextFunction, Request, Response } from 'express';
// import http from 'http';
export class Logger {
  private static instance: Logger;
  private logger!: pino.Logger;

  private constructor() {
    // Initialize the logger with your desired configuration
    this.initializeLogger();
  }

  private initializeLogger(): void {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public getHttpLogger(): (req: Request, res: Response, next: NextFunction) => void {
    const httpLogger = pinoHttp({
      logger: this.logger,
      autoLogging: false,
    });

    return (req: Request, res: Response, next: NextFunction) => {
      httpLogger(req, res, () => {});
      res.on('finish', () => {
        if (res.statusCode === 404) {
          this.logger.warn(`Route not found: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
        } else {
          this.logger.info(`Request completed: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
        }
      });
      next();
    };
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public fatal(message: string): void {
    this.logger.fatal(message);
  }
}
