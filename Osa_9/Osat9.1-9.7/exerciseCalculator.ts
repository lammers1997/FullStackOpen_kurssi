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
  console.log(calculateExercises([0], 2));
} catch (error) {
  console.log(error.message);
}
