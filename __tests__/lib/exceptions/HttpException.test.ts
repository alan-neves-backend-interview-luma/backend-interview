import { HttpException, BadRequestException } from '../../../src/lib/exceptions';

describe('HttpException', () => {
  
  it('should create an instance of HttpException with correct statusCode and message', () => {
    const errorMessage = 'Custom error message';
    const statusCode = 500;
    const error = new HttpException(statusCode, errorMessage);

    expect(error).toBeInstanceOf(HttpException);
    expect(error.message).toBe(errorMessage);
    expect(error.statusCode).toBe(statusCode);
  });

  it('should set the prototype correctly for HttpException', () => {
    const error = new HttpException(500, 'Internal Server Error');
    expect(Object.getPrototypeOf(error)).toBe(HttpException.prototype);
  });
});

describe('BadRequestException', () => {
  
  it('should create an instance of BadRequestException with default message', () => {
    const error = new BadRequestException();
    
    expect(error).toBeInstanceOf(BadRequestException);
    expect(error.message).toBe('Bad Request');
    expect(error.statusCode).toBe(400);
  });

  it('should create an instance of BadRequestException with custom message', () => {
    const customMessage = 'Invalid input data';
    const error = new BadRequestException(customMessage);

    expect(error).toBeInstanceOf(BadRequestException);
    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(400);
  });

  it('should set the prototype correctly for BadRequestException', () => {
    const error = new BadRequestException();
    expect(Object.getPrototypeOf(error)).toBe(BadRequestException.prototype);
  });
});