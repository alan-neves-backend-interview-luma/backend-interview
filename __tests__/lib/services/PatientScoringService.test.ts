import fs from 'fs';
import { type Patient } from '../../../src/lib/models';
import { PatientScoringService } from '../../../src/lib/services';
import { type Coordinates } from '../../../src/lib/types';

describe('PatientScoringService', () => {
  let scoringService: PatientScoringService;
  let patients: Patient[];

  beforeEach(() => {
    const patientData = fs.readFileSync('sample-data/patients.json', 'utf8');
    patients = JSON.parse(patientData);
    scoringService = new PatientScoringService(patients, 10);
  });

  it('should calculate and return top patients by score', () => {
    const facilityCoordinates: Coordinates = { latitude: 10, longitude: 20 };
    const result = scoringService.getHighestScorePatientsByFacilityLocation(facilityCoordinates);

    expect(result).toHaveLength(10);
    expect(result[0]?.score).toBeGreaterThanOrEqual(result[1]?.score ?? 0);
  });

  it('should calculate scores within a valid range', () => {
    const facilityCoordinates: Coordinates = { latitude: 10, longitude: 20 };
    scoringService.getHighestScorePatientsByFacilityLocation(facilityCoordinates);

    scoringService.getPatients().forEach(patient => {
      expect(patient.score).toBeGreaterThanOrEqual(0);
      expect(patient.score).toBeLessThanOrEqual(100);
    });
  });

  it('should update min and max values correctly', () => {
    (scoringService as any).calculateMinMaxValues();

    expect(scoringService.minMaxValues.age.min).toBeLessThanOrEqual(scoringService.minMaxValues.age.max);
    expect(scoringService.minMaxValues.acceptedOffers.min).toBeLessThanOrEqual(scoringService.minMaxValues.acceptedOffers.max);
    expect(scoringService.minMaxValues.replyTime.min).toBeLessThanOrEqual(scoringService.minMaxValues.replyTime.max);
  });

  it('should correctly calculate patient distances', () => {
    const facilityCoordinates: Coordinates = { latitude: 10, longitude: 20 };
    (scoringService as any).getPatientDistanceFromFacility(facilityCoordinates);

    scoringService.getPatients().forEach(patient => {
      expect(patient.distance).toBeDefined();
      expect(patient.distance).toBeGreaterThanOrEqual(0);
    });
  });
});
