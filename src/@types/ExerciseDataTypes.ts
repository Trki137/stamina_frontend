export type ExerciseDataType = {
  userData: MyDataType[];
  avgData: AvgDataType[];
};

export type MyDataType = {
  name: string;
  date: string;
  time: string;
  calories: number;
  avg_hearth_rate: number;
};

export type AvgDataType = {
  date: string;
  avgtime: string;
  avgcalories: number;
  avg_hearth_rate: number;
};

export type SaveData = {
  name: string;
  date: string;
  userId: number;
  trainingId: null | number;
  time: string;
  calories: number;
  avg_hearth_rate: number | null;
};
