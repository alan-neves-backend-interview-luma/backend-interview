import { type Patient } from '../models';
import { type Coordinates, type MinMaxValues } from '../types';
import { calculateHaversineDistance, normalize } from '../utils';

export class PatientScoringService {
  private readonly SCORE_WEIGHTS = {
    age: 0.1,
    distance: 0.1,
    acceptedOffers: 0.3,
    canceledOffers: 0.3,
    replyTime: 0.2
  };

  public minMaxValues: MinMaxValues = {
    age: { min: Infinity, max: -Infinity },
    distance: { min: Infinity, max: -Infinity },
    acceptedOffers: { min: Infinity, max: -Infinity },
    canceledOffers: { min: Infinity, max: -Infinity },
    replyTime: { min: Infinity, max: -Infinity }
  };

  constructor(private patients: Patient[], private numberOfTopPatients: number) {
  }

  public getHighestScorePatientsByFacilityLocation(facilityCoordinates: Coordinates): Patient[] {
    this.getPatientDistanceFromFacility(facilityCoordinates);
    this.calculateMinMaxValues();
    this.calculatePatientScores();

    const topPatients = this.getTopPatientsByScore();
    const randomLowBehaviorPatients = this.getRandomLowBehaviorPatients(topPatients);

    return this.shuffleTopPatients(topPatients, randomLowBehaviorPatients);
  }

  private getTopPatientsByScore(): Patient[] {
    return this.patients.sort((a, b) => b.score - a.score).slice(0, this.numberOfTopPatients);
  }

  private shuffleTopPatients(topPatients: Patient[], randomLowBehaviorPatients: Patient[]): Patient[] {
    const shuffledTopPatients = [...topPatients];

    randomLowBehaviorPatients.forEach(patient => {
      const randomIndex = Math.floor(Math.random() * (shuffledTopPatients.length + 1));
      shuffledTopPatients.splice(randomIndex, 0, patient);
    });

    return shuffledTopPatients.slice(0, this.numberOfTopPatients);
  }

  private getRandomLowBehaviorPatients(topPatients: Patient[]): Patient[] {
    const lowBehaviorPatients = this.patients.filter(patient => 
      patient.acceptedOffers + patient.canceledOffers < 12 && !topPatients.includes(patient)
    );

    const numToSelect = Math.ceil(this.numberOfTopPatients * 0.1);
    return lowBehaviorPatients
      .sort(() => Math.random() - 0.5)
      .slice(0, numToSelect);  
  }

  private calculatePatientScores(): void {
    this.patients = this.patients.map((patient) => ({
      ...patient,
      score: this.calculateScore(patient)
    }));
  }
  
  public calculateScore(patient: Patient): number {
    const normalizedAge = normalize(patient.age, this.minMaxValues.age);
    const normalizedAcceptedOffers = normalize(patient.acceptedOffers, this.minMaxValues.acceptedOffers);
    const normalizedCanceledOffers = normalize(patient.canceledOffers, this.minMaxValues.canceledOffers);
    const normalizedReplyTime = normalize(patient.averageReplyTime, this.minMaxValues.replyTime);
    const normalizedDistance = normalize(patient.distance as number, this.minMaxValues.distance);

    return (
        normalizedAge * this.SCORE_WEIGHTS.age +
        normalizedAcceptedOffers * this.SCORE_WEIGHTS.acceptedOffers +
        (1 - normalizedCanceledOffers) * this.SCORE_WEIGHTS.canceledOffers +  
        (1 - normalizedReplyTime) * this.SCORE_WEIGHTS.replyTime +  
        (1 - normalizedDistance) * this.SCORE_WEIGHTS.distance
    ) * 10;
  }

  private getPatientDistanceFromFacility(facilityCoordinates: Coordinates): void {
    this.patients = this.patients.map((patient) => ({
      ...patient,
      distance: calculateHaversineDistance(facilityCoordinates, patient.location)
    }));
  }

  private calculateMinMaxValues(): void {
    for (const patient of this.patients) {
      this.updateMinMax(this.minMaxValues.age, patient.age);
      this.updateMinMax(this.minMaxValues.acceptedOffers, patient.acceptedOffers);
      this.updateMinMax(this.minMaxValues.canceledOffers, patient.canceledOffers);
      this.updateMinMax(this.minMaxValues.replyTime, patient.averageReplyTime);
      this.updateMinMax(this.minMaxValues.distance, patient.distance as number);
    }
  }

  private updateMinMax(range: { min: number, max: number }, value: number): void {
    range.min = Math.min(range.min, value);
    range.max = Math.max(range.max, value);
  }

  public getPatients(): Patient[] {
    return this.patients;
  }
}