import { type APIGatewayProxyEvent } from "aws-lambda";

export const getEventQueryParams = (event: APIGatewayProxyEvent): any => {
  return event.queryStringParameters || {};
};

export const createLambdaResponse = (statusCode: number, body: any): any => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

