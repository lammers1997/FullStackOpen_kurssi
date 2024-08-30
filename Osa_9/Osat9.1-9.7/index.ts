import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNumber } from './uitls';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height < 1 || weight < 1) {
        return res.status(400).json({ error: 'Malformatted parameters' });
    }
    const result: string = calculateBmi(height, weight);

    return res.json({
        weight: weight,
        height: height,
        bmi: result
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!daily_exercises || !target || daily_exercises.length < 1) {
        return res.status(400).json({ error: 'parameters missing' });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        isNumber(daily_exercises);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        isNumber(target);
    } catch {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(calculateExercises(daily_exercises, target));


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});