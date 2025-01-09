import { type APIGatewayProxyResult } from 'aws-lambda';
import { errorHandler } from '../../../src/lib/utils';
import { HttpException } from '../../../src/lib/exceptions';

describe('errorHandler', () => {

  it('should return a formatted response for an HttpException', () => {
    const error = new HttpException(404, 'Not Found');
    
    const result: APIGatewayProxyResult = errorHandler(error);
    
    expect(result.statusCode).toBe(404);
    expect(result.body).toBe(JSON.stringify({ message: 'Not Found' }));
  });

  it('should return a 500 response for a generic error', () => {
    const error = new Error('Something went wrong');
    
    const result: APIGatewayProxyResult = errorHandler(error);
    
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: 'Internal Server Error' }));
  });

  it('should handle missing error message in HttpException', () => {
    const error = new HttpException(400, '');
    
    const result: APIGatewayProxyResult = errorHandler(error);
    
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(JSON.stringify({ message: '' }));
  });

  it('should handle unexpected error type and return 500 status', () => {
    const error = {} as Error;
    
    const result: APIGatewayProxyResult = errorHandler(error);
    
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ message: 'Internal Server Error' }));
  });
});