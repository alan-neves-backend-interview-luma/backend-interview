import { type Coordinates } from "../types";

export const calculateHaversineDistance = (point1: Coordinates, point2: Coordinates): number => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const EARTH_RADIUS_KM = 6371;

  const latitudeDifference = toRadians(point2.latitude - point1.latitude);
  const longitudeDifference = toRadians(point2.longitude - point1.longitude);

  const haversineFormula = 
      Math.sin(latitudeDifference / 2) ** 2 +
      Math.cos(toRadians(point1.latitude)) * Math.cos(toRadians(point2.latitude)) *
      Math.sin(longitudeDifference / 2) ** 2;

  const centralAngle = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));
  
  return EARTH_RADIUS_KM * centralAngle;
};
