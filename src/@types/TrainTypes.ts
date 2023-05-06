import { allWorkoutsType } from "./WorkoutType";

export type TrainType = {
  sequence: number;
  time: number | null;
  repetition: number | null;
  name: string;
  intensity: string;
};

export type TrainingData = {
  trainingId: number;
  restBetweenWorkouts: number;
  restBetweenSets: number;
  numberOfSets: number;
  avgCalories: number;
  data: TrainType[];
  workouts: allWorkoutsType[];
};
