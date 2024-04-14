import App from './app';
import { RoutesArray } from './controllers';

const app = new App(RoutesArray);

app.listen();