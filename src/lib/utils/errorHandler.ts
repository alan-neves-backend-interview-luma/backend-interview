import { type APIGatewayProxyResult } from 'aws-lambda';
import { HttpException } from '../exceptions/HttpException';

export const errorHandler = (error: Error): APIGatewayProxyResult => {
  if (error instanceof HttpException) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({ message: error.message }),
    };
  }
  
  return {
    statusCode: 500,
    body: JSON.stringify({ message: "Internal Server Error" }),
  };
};