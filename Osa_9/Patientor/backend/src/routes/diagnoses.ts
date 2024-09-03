import express from 'express';
import { Response } from 'express';
import diagnoseService from '../services/diagnoseService';
import { Diagnosis } from '../types';


const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnoseService.getEntries());
});

export default router;