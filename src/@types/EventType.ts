export type CardChallengeType = {
  id: number;
  createdby: string;
  name: string;
  until: string;
  equipment: string;
  description: string;
  image: string | null;
};

export type SaveChallengeType = {
  name: string;
  description: string;
  date: string;
  workoutId: number;
  userId: number;
};

export type CardEventType = {
  id: number;
  createdby: string;
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
