import patients from '../../data/patients';

import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, ssn, occupation }) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries
};