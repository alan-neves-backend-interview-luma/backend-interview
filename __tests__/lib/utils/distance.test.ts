import { calculateHaversineDistance } from "../../../src/lib/utils/distance";
import { type Coordinates } from "../../../src/lib/types";

const LONDON_TO_NEW_YORK_MIN_KM = 5000;
const LONDON_TO_NEW_YORK_MAX_KM = 6000;

describe("calculateHaversineDistance", () => {
  it("should return 0 if the points are the same", () => {
    const point1: Coordinates = { latitude: 0, longitude: 0 };
    const point2: Coordinates = { latitude: 0, longitude: 0 };

    const distance = calculateHaversineDistance(point1, point2);
    
    expect(distance).toBe(0);
  });

  it("should return a positive distance for valid coordinates (London to New York)", () => {
    const point1: Coordinates = { latitude: 51.5074, longitude: -0.1278 }; // London, UK
    const point2: Coordinates = { latitude: 40.7128, longitude: -74.0060 }; // New York, USA

    const distance = calculateHaversineDistance(point1, point2);

    expect(distance).toBeGreaterThan(LONDON_TO_NEW_YORK_MIN_KM);
    expect(distance).toBeLessThan(LONDON_TO_NEW_YORK_MAX_KM);
  });

});