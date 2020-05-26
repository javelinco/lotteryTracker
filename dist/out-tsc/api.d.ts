import * as Hapi from '@hapi/hapi';
export default class Api {
    private static _instance;
    static start(): Promise<Hapi.Server>;
    static stop(): Promise<void>;
    static get instance(): Hapi.Server;
    static preResponse(request: Hapi.Request, h: Hapi.ResponseToolkit): symbol;
}
