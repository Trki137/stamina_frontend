export type CardChallengeType = {
  id: number;
  createdBy: string;
  name: string;
  until: string;
  equipment: string;
  description: string;
  image: string | null;
};
export type CardEventType = {
  id: number;
  createdBy: string;
  name: string;
  startsAt: string;
  remainingSpace: number;
  description: string;
  location: Location;
  image: string | null;
};

export type Location = {
  city: string;
  address: string;
};
