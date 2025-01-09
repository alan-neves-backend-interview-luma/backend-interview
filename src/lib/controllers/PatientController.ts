import { BadRequestException } from "../exceptions";
import { type PatientResponseDTO, type PatientRequestDTO } from "../dto";
import { PatientService } from "../services";

export class PatientController {
  private patientService = new PatientService();

  public getTopPatients(request?: PatientRequestDTO): PatientResponseDTO {
    if (!request?.latitude || !request?.longitude) {
      throw new BadRequestException("Latitude and longitude are required");
    }

    return this.patientService.findTopPatients(request);
  }
}