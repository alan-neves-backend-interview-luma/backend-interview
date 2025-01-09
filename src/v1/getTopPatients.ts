import { type APIGatewayProxyEvent, type APIGatewayProxyResult } from "aws-lambda";
import { getEventQueryParams, createLambdaResponse, errorHandler } from "../lib/utils";
import { PatientController } from "../lib/controllers";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = getEventQueryParams(event);
    const topPatients = (new PatientController()).getTopPatients(queryParams);

    return createLambdaResponse(200, topPatients);
  } catch (error) {
    return errorHandler(error as Error);
  }
};
