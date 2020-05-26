/// <reference types="hapi__boom" />
import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
export declare type OsResponse<T> = T | Boom<null>;
export interface GenericRequest extends Hapi.Request {
    readonly payload: any;
}
export interface HapiRequest<T = any, R = any> extends GenericRequest {
    readonly payload: T;
    query: Hapi.RequestQuery & R;
}
