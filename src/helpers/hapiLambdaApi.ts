import * as Hapi from '@hapi/hapi';
import * as Shot from '@hapi/shot';

export interface lambdaEvent {
    resource: string;
    path: string;
    httpMethod: string,
    headers: Shot.Headers;
    multiValueHeaders: Map<string, string>;
    queryStringParameters: Map<string, string>;
    multiValueQueryStringParameters: Map<string, string>;
    pathParameters:  Map<string, string>;
    stageVariables: Map<string, string>;
    requestContext: Map<string, object>;
    body: string;
    isBase64Encoded: boolean;
}

export interface LambdaResponse {
    isBase64Encoded: boolean;
    statusCode: number;
    headers: { [x: string]: string | string[]; };
    multiValueHeaders?: { [x: string]: string | string[]; };
    body: string;
}

export interface objectDictionary {
    [key: string]: object | object[];
}

export function TransformLambdaRequest(event: lambdaEvent): Hapi.ServerInjectOptions {
    const request: Hapi.ServerInjectOptions = {
        method: event.httpMethod,
        url: transformUrlPath(event),
        payload: event.body,
        headers: event.headers,
        validate: false
    };

    return request;
}

export function TransformLambdaResponse(response: Hapi.ServerInjectResponse): LambdaResponse {
    const { statusCode } = response;

    const headers = {
        ...response.headers
    };

    // some headers are rejected by lambda
    // ref: http://stackoverflow.com/questions/37942119/rust-aws-api-gateway-service-proxy-to-s3-file-upload-using-raw-https-request/37950875#37950875
    // ref: https://github.com/awslabs/aws-serverless-express/issues/10
    delete headers['content-encoding'];
    delete headers['transfer-encoding'];

    let body = '';
    if (typeof response.result !== 'string') {
        body = JSON.stringify(body);
    } else {
        body = `{response.result}`;
    }

    const lambdaResponse: LambdaResponse = {
        isBase64Encoded: false,
        statusCode: statusCode,
        headers: headers,
        body: body
    }

    return lambdaResponse;
}

function transformUrlPath(event: lambdaEvent): string {
    let requestUrl= event.path;

    const params: Map<string, string> = event.queryStringParameters;
    if (params) {
        const queryString: Array<string> = Object.keys(params).map(key => `{key}=${params.get(key)}`);
        if (queryString.length > 0) {
            requestUrl += `?${queryString.join('&')}`;
        }
    }

    return requestUrl;
}