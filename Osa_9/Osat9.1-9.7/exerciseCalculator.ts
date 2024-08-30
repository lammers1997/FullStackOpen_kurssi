import { isNumber, isLengthCorrect } from "./uitls";


interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercises: number[],
  targetValue: number
): Result => {
  if (exercises.length === 0) {
    throw new Error("Please provide some training data");
  }
  const completedDays: number = exercises.filter((item) => item > 0).length;
  const avgHours: number =
    exercises.reduce((a, b) => a + b, 0) / exercises.length;

  let isSuccess: boolean;

  if (avgHours >= targetValue) {
    isSuccess = true;
  } else {
    isSuccess = false;
  }

  let rateNmber: number;
  let rate: string;

  if (avgHours >= 3) {
    rateNmber = 3;
    rate = "Well done!";
  } else if (avgHours > 1.5 && avgHours < 3) {
    rateNmber = 2;
    rate = "not too bad but could be better";
  } else if (avgHours <= 1.5 && avgHours > 0.8) {
    rateNmber = 1;
    rate = "You did not even try";
  } else {
    rateNmber = 0;
    rate = "Very bad!";
  }

  return {
    periodLength: exercises.length,
    trainingDays: completedDays,
    success: isSuccess,
    rating: rateNmber,
    ratingDescription: rate,
    target: targetValue,
    average: avgHours,
  };
};

try {
  const exercises = process.argv.slice(2);
  //are all numbers AND is length NOT 0
  if (exercises.length < 2) {
    throw new Error('Add some exercises. First parameter is target value')

  } else if (exercises.length > 1 && isNumber(exercises)) {
    const exerc = exercises.map(Number); // Convert all to numbers
    console.log(calculateExercises(exerc.slice(1), exerc[0]))
  }

} catch (error: unknown) {
  let errorMessage = "Something went wrong."
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
