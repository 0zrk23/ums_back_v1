import express from 'express';
import cors from 'cors';
import { CREDENTIALS, LOG_FORMAT, ORIGIN } from './config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Routes } from './interfaces/routes.interface';
import { logger, stream } from './utils/logger';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { dbConnection } from './databases';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;

    //run private methods
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: ORIGIN || '*',
      credentials: CREDENTIALS || true,
    }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose
      .connect(dbConnection.url)
      .then(() => {
        logger.info('📦 Connected to database');
      })
      .catch((err) => {
        logger.error(`❌ Error connecting to database: ${err}`);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  
  }
}

export default App;