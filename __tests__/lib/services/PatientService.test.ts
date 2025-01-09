import { PatientService } from "../../../src/lib/services";
import fs from 'fs';

jest.mock('fs');

describe('PatientService', () => {
  let service: PatientService;
  let mockPatients: any[];

  beforeEach(() => {
    mockPatients = [
      { id: 1, acceptedOffers: 10, canceledOffers: 2, age: 50, averageReplyTime: 5, location: { latitude: 10, longitude: 20 } },
    ];
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockPatients));
    service = new PatientService();
  });

  it('should load patients from file', () => {
    expect(service.findTopPatients({ latitude: 10, longitude: 20 })).toHaveLength(1);
  });
});