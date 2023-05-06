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
  latitude: number;
  longitude: number;
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
  latitude?: number;
  longitude?: number;
  max_space?: number;
  pbr?: number;
  cityid?: number;
  addressid?: number;
};

export type JoinUnJoinEventType = {
  userId: number;
  eventId: number;
};

export type UpdateGroupEventType = {
  max_space: number;
  date_time: string;
  eventId: number;
  cityId: number;
  pbr: number;
  name: string;
  addressId: number;
  street: string;
  latitude: number;
  longitude: number;
  eventName: string;
  description: string;
};
