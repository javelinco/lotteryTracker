import * as Hapi from '@hapi/hapi';
import { PowerballController } from './controllers/powerball-controller';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    const powerballController = new PowerballController();

    server.route(powerballController.routes());
    server.route({
      path: '/health-check',
      method: 'GET',
      handler: () => 'Ok',
      options: {
        auth: false
      }
    });
  }
}
