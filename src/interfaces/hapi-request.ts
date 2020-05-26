import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';

export type OsResponse<T> = T | Boom<null>;

// This is created to get around a typescript type warning for type T not being compatible with the type of payload from
// Hapi.Request
export interface GenericRequest extends Hapi.Request {
  readonly payload: any;
}

export interface HapiRequest<T = any, R = any> extends GenericRequest {
  readonly payload: T;
  query: Hapi.RequestQuery & R;
}
