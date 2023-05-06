export type CardChallengeType = {
  id: number;
  createdby: string;
  name: string;
  until: string;
  description: string;
  image: string | null;
  finished: boolean;
};

export type SaveChallengeType = {
  name: string;
  description: string;
  date: string;
  userId: number;
};

export type UpdateChallengeType = {
  eventId: number;
  date: string;
  name: string;
  description: string;
};

export type SaveGroupEventType = {
  name: string;
  description: string;
  userId: number;
  max_space: number;
  date_time: string;
  street: string;
  pbr: number;
  cityName: string;
};

export type CardEventType = {
  id: number;
  createdby: string;
  name: string;
  startsat: string;
  remainingspace: number;
  description: string;
  city: string;
  address: string;
  image: string | null;
};

export type JoinUnJoinEventType = {
  userId: number;
  eventId: number;
};
