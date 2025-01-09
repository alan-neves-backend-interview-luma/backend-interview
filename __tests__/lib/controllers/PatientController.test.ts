import { PatientController } from "../../../src/lib/controllers";
import { BadRequestException } from "../../../src/lib/exceptions";
import { type PatientRequestDTO } from "../../../src/lib/dto";

jest.mock("../../../src/lib/services/PatientService");

describe('PatientController', () => {
  let patientController: PatientController;

  beforeEach(() => {
    patientController = new PatientController();
  });

  describe('getTopPatients', () => {
    it('should throw BadRequestException if latitude or longitude is not provided', () => {
      const request: PatientRequestDTO = {} as any;

      expect(() => patientController.getTopPatients(request)).toThrowError(BadRequestException);
      expect(() => patientController.getTopPatients(request)).toThrowError("Latitude and longitude are required");
    });
  });
});
