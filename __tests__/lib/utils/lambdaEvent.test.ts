import { getEventQueryParams, createLambdaResponse } from "../../../src/lib/utils";

describe('Lambda Utilities', () => {

  describe('getEventQueryParams', () => {
    it('should return an empty object if queryStringParameters is undefined', () => {
      const event: any = {
        queryStringParameters: null,
        body: null,
        headers: {},
        pathParameters: {},
        requestContext: {} as any,
        resource: '',
        httpMethod: '',
      };
      
      const result = getEventQueryParams(event);

      expect(result).toEqual({});
    });

    it('should return an empty object if queryStringParameters is null', () => {
      const event: any = {
        queryStringParameters: null,
        body: null,
        headers: {},
        pathParameters: {},
        requestContext: {} as any,
        resource: '',
        httpMethod: '',
      };

      const result = getEventQueryParams(event);

      expect(result).toEqual({});
    });

    it('should return the query parameters if queryStringParameters is defined', () => {
      const event: any = {
        queryStringParameters: { param1: 'value1', param2: 'value2' },
        body: null,
        headers: {},
        pathParameters: {},
        requestContext: {} as any,
        resource: '',
        httpMethod: '',
      };

      const result = getEventQueryParams(event);

      expect(result).toEqual({ param1: 'value1', param2: 'value2' });
    });
  });

  describe('createLambdaResponse', () => {
    it('should return a valid response object with statusCode and stringified body', () => {
      const statusCode = 200;
      const body = { message: 'Success' };

      const result = createLambdaResponse(statusCode, body);

      expect(result).toEqual({
        statusCode: 200,
        body: JSON.stringify(body),
      });
    });

    it('should return an empty body as a string when body is an empty object', () => {
      const statusCode = 204;
      const body = {};

      const result = createLambdaResponse(statusCode, body);

      expect(result).toEqual({
        statusCode: 204,
        body: JSON.stringify(body),
      });
    });

    it('should handle non-object body gracefully', () => {
      const statusCode = 400;
      const body = "Error occurred";

      const result = createLambdaResponse(statusCode, body);

      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify(body),
      });
    });
  });
});