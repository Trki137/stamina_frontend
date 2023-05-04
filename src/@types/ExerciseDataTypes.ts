export type ExerciseDataType = {
  userData: MyDataType[];
  avgData: AvgDataType[];
};

type MyDataType = {
  name: string;
  date: string;
  time: string;
  calories: number;
  avg_hearth_rate: number;
};

type AvgDataType = {
  date: string;
  avgtime: string;
  avgcalories: number;
  avg_hearth_rate: number;
};
