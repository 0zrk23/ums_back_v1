import { DefaultController } from '../controllers/default.controller';
import { Route } from './route';

export class DefaultRoute extends Route {

  constructor() {
    super('/ping', new DefaultController());
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get(`${this.path}`, this.controller.ping);
  }
}