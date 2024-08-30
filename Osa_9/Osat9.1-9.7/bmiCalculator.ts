import { isNumber, isLengthCorrect } from "./uitls";

const calculateBmi = (height: number, weigth: number): string => {
  const bmi: number = weigth / Math.pow(height / 100, 2);
  if (bmi < 16) {
    return "Severly underweight";
  } else if (bmi >= 16 && bmi < 18.4) {
    return "Underweight";
  } else if (bmi >= 18.4 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obese";
  }
};

try {
  //input length must be 2 NUMBERS
  if (isLengthCorrect(process.argv.slice(2), 2) && isNumber(process.argv.slice(2))) {
    const a: number = Number(process.argv[2])
    const b: number = Number(process.argv[3])
    //if either of input values is zero, throw error
    if (a === 0 || b === 0){
      throw new Error('Height or weight can not be zero!')
    }
      console.log(calculateBmi(a, b))
  }
} catch (error: unknown) {
  let errorMessage = "Something went wrong."
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
