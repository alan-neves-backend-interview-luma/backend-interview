import { type Patient } from "../models";

export type PatientResponseDTO = Omit<Patient, 'score' | 'distance'>[];