import api from './api';
// import * as Hapi from '@hapi/hapi';
import Logger from './helpers/logger';
import * as dotenv from 'dotenv';
// import { TransformLambdaRequest, TransformLambdaResponse, lambdaEvent } from './helpers/hapiLambdaApi';

// let server: Hapi.Server = api.instance;

dotenv.config();

(async () => {
  try {
    Logger.instantiate();
    await api.start();
  } catch (error) {
    Logger.instance.error('Server crashed', error);
    process.exit(1);
  }
})().catch(console.error);
// (async event => {
//   try {
//     if (!server) {
//       Logger.instantiate();
//       server = await api.start();
//     }

//     if (event) {
//       const request = TransformLambdaRequest(<lambdaEvent><unknown>event);

//       // handle cors here if needed
//       if (!request.headers) {
//         request.headers = {}
//       }
//       request.headers['Access-Control-Allow-Origin'] = '*';
//       request.headers['Access-Control-Allow-Credentials'] = 'true';

//       const response = await server.inject(request);

//       return TransformLambdaResponse(response);
//     }
//   } catch (error) {
//       Logger.instance.error('Server crashed', error);
//       process.exit(1);
//   }
// })().catch(console.error);
