import express, { json, urlencoded } from "express";
class Server {
  private app: express.Application;
  private port: string | number;

  constructor(port: string | number) {
    this.app = express();
    this.port = port;
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const PORT = process.env.APP_PORT ?? 5000;

const server = new Server(PORT);
server.listen();
