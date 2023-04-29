export type CardChallengeType = {
  id: number;
  createdBy: string;
  name: string;
  until: string;
  equipment: string;
};
export type CardEventType = {
  id: number;
  createdBy: string;
  name: string;
  startsAt: string;
  remainingSpace: number;
  location: Location;
};

export type Location = {
  city: string;
  address: string;
};