import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';

export abstract class Route implements Routes {
  public router = Router();

  constructor(public path: string, public controller: any) {
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;
}

// export class DefaultRoute implements Routes {
//   public path = '';
//   public router = Router();
//   public pingController = new DefaultController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.get(`${this.path}/ping`, this.pingController.ping);
//   }
// }