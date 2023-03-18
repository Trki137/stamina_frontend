import { ExerciseCardType } from "../@types/ExerciseCard";
import { routes } from "../api/paths";

export const cardData: ExerciseCardType[] = [
  {
    title: "Create training",
    description: ["Create own training routine and share it with community"],
    linkText: "Create",
    link: routes.createTraining,
    imagePath: "/images/image2.jpg",
  },
  {
    title: "Add workout",
    description: [
      "You have a nice workout?",
      "You can add it to app and ,if you want, you can share it with community",
    ],
    linkText: "Add",
    link: routes.addWorkout,
    imagePath: "/images/image1.jpg",
  },
  {
    title: "Choose training",
    description: ["See other peoples workout routines and try them"],
    linkText: "Start",
    link: routes.chooseTraining,
    imagePath: "/images/equipment.jpeg",
  },
  {
    title: "Add data",
    description: ["Add data by hand or send us files"],
    linkText: "Input data",
    link: routes.inputData,
    imagePath: "/images/data.jpeg",
  },
];