import { type APIGatewayProxyEvent } from "aws-lambda";
import { PatientController } from "../../src/lib/controllers";
import { handler } from "../../src/v1/getTopPatients";

describe('getTopPatients Lambda Handler', () => {
  afterEach(() => {
      jest.clearAllMocks();
  });

  it('should return 400 if latitude or longitude is missing', async () => {
    const mockEvent = { queryStringParameters: {} } as unknown as APIGatewayProxyEvent;

    const response = await handler(mockEvent);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe('Latitude and longitude are required');
  });

  it('should return 200 with top patients', async () => {
    const mockQueryParams = { latitude: 10, longitude: 20 };
    const mockEvent = { queryStringParameters: mockQueryParams } as unknown as APIGatewayProxyEvent;
    const mockPatients = [{ 
      id: "1",
      name: 'John Doe',
      score: 9.9,
      distance: 100.1,
      age: 30,
      acceptedOffers: 10,
      canceledOffers: 1,
      averageReplyTime: 10,
      location: {
        latitude: 10,
        longitude: 20
      }
    }];

    jest.spyOn(PatientController.prototype, 'getTopPatients').mockReturnValue(mockPatients);

    const response = await handler(mockEvent);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockPatients);
  });
});