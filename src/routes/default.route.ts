import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import { DefaultController } from '../controllers/default.controller';

export class DefaultRoute implements Routes {
  public path = '';
  public router = Router();
  public pingController = new DefaultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/ping`, this.pingController.ping);
  }
}