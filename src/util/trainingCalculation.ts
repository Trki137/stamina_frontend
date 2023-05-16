import { allWorkoutsType } from "../@types/WorkoutType";
import { trainingInfoType, workoutsToSendType } from "../@types/TrainingTypes";

type CalorieCount = {
  high: number;
  moderate: number;
  low: number;
};

export type Time = {
  high: number;
  moderate: number;
  low: number;
};
export const avgTimePerIntensity: Time = {
  high: 6,
  moderate: 4.25,
  low: 2.5,
};
const averageCaloriesPerMinute: CalorieCount = {
  high: 35,
  moderate: 25,
  low: 16,
};

export function calculateTime(
  workouts: allWorkoutsType[],
  trainingInfo: workoutsToSendType[],
  roundInfo: trainingInfoType
) {
  const numberOfSets = roundInfo.sets;
  let totalTime: number =
    roundInfo.restSet * (numberOfSets - 1) +
    roundInfo.restWorkout * (workouts.length - 1) * numberOfSets;

  for (let i = 0; i < workouts.length; i++) {
    const workout = workouts[i];

    const workoutInfo = trainingInfo.filter((w) => {
      return w.workoutid === workout.workoutid;
    })[0];

    if (!workoutInfo) continue;

    if (workoutInfo.time !== null) {
      totalTime += workoutInfo.time * numberOfSets;
      continue;
    }

    if (workoutInfo.repetition === null) return;
    totalTime +=
      workoutInfo.repetition *
      numberOfSets *
      avgTimePerIntensity[workout.intensity.toLowerCase() as keyof Time];
  }

  return `${totalTime}`;
}

export function calculateAvgCalories(
  workouts: allWorkoutsType[],
  totalDuration: number,
  trainingInfo: workoutsToSendType[],
  roundInfo: trainingInfoType
) {
  const totalCalories = trainingInfo.reduce(
    (sum, workout) =>
      (sum +=
        getAvgCalPerMinute(workout, workouts) *
        getTime(workout.workoutid, workouts, workout)),
    0
  );

  console.log(totalCalories);

  return `${Math.round(totalCalories * 100) / 100}`;
}

export function resolveIntensity(workouts: allWorkoutsType[]) {
  const highIntensityNumber = workouts.filter(
    (workout) => workout.intensity.toLowerCase() === "high"
  ).length;
  const moderateIntensityNumber = workouts.filter(
    (workout) => workout.intensity.toLowerCase() === "moderate"
  ).length;
  const lowIntensityNumber = workouts.filter(
    (workout) => workout.intensity.toLowerCase() === "low"
  ).length;

  if (
    highIntensityNumber >= moderateIntensityNumber &&
    highIntensityNumber >= lowIntensityNumber
  )
    return "high";
  if (
    moderateIntensityNumber >= highIntensityNumber &&
    moderateIntensityNumber >= lowIntensityNumber
  )
    return "moderate";

  return "low";
}

const getAvgCalPerMinute = (
  workout: workoutsToSendType,
  trainingInfo: allWorkoutsType[]
) => {
  const intensity = trainingInfo
    .filter((info) => info.workoutid === workout.workoutid)
    .map((info) => info.intensity)[0];

  return averageCaloriesPerMinute[
    intensity.toLowerCase() as keyof CalorieCount
  ];
};

const getTime = (
  workoutid: number,
  trainingInfo: allWorkoutsType[],
  workout: workoutsToSendType
) => {
  const intensity = trainingInfo
    .filter((info) => info.workoutid === workoutid)
    .map((i) => i.intensity)[0];

  if (!workout) return 0;
  if (workout.time !== null) return workout.time / 60;
  if (workout.repetition != null)
    console.log(
      workout.repetition * avgTimePerIntensity[intensity as keyof Time]
    );
  return workout.repetition === null
    ? 0
    : (workout.repetition * avgTimePerIntensity[intensity as keyof Time]) / 60;
};
