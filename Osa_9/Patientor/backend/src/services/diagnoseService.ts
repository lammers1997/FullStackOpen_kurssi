import diagnosis from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
    return diagnosis;
};

const addDiagnose = () => {
    return null;
};

export default {
    getEntries,
    addDiagnose
};