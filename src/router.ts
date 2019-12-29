import * as Hapi from '@hapi/hapi';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
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