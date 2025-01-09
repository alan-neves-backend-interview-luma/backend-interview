import { type Patient } from '../models/Patient';
import { type PatientResponseDTO, type PatientRequestDTO } from '../dto';
import fs from 'fs';
import { PatientScoringService } from './';

export class PatientService {
  private NUMBER_OF_TOP_PATIENTS = 10;

  private patients: Patient[] = [];
  private scoringService: PatientScoringService;

  constructor() {
    this.loadPatients();
    this.scoringService = new PatientScoringService(this.patients, this.NUMBER_OF_TOP_PATIENTS);
  }

  private loadPatients(): void {
    const patients = fs.readFileSync('sample-data/patients.json', 'utf8');
    this.patients = JSON.parse(patients).map((patient: Patient) => ({
      ...patient,
      score: 0,
      distance: 0
    }));
  }

  public findTopPatients(request: PatientRequestDTO): PatientResponseDTO {
    const patients = this.scoringService.getHighestScorePatientsByFacilityLocation({
      latitude: request.latitude,
      longitude: request.longitude,
    });

    return patients.map(({ distance, score, ...patient }) => patient);
  }
}
