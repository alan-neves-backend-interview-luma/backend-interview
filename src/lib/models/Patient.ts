import { type Coordinates } from "../types";

type Patient = {
  id: string;
  name: string;
  age: number;
  location: Coordinates
  acceptedOffers: number;
  canceledOffers: number;
  averageReplyTime: number;
  score: number;
  distance: number;
}

export type { Patient };