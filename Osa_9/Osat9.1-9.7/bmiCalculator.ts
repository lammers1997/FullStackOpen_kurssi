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

console.log(calculateBmi(180, 70));
