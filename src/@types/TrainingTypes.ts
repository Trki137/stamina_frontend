export type workoutsToSendType = {
  workoutid: number;
  time: number | null;
  repetition: number | null;
};

export type saveTrainingType = {
  time: string;
  name: string;
  intensity: string;
  description: string;
  avg_calories: string;
  numOfSets: number;
  restBetweenSets: number;
  restBetweenWorkouts: number;
  workouts: workoutsToSendType[];
};

export type trainingInfoType = {
  restSet: number;
  restWorkout: number;
  sets: number;
};

export type trainingInfoCardType = {
  [key: string]: any;
  time: number;
  name: string;
  intensity: string;
  description: string;
  trainingid: number;
  avg_calories: number;
  targeted_muscles: string;
};
