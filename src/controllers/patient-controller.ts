import { Request, Response } from 'express';
import { BaseService } from '../services/BaseService';

class PatientController {
    constructor(private patientService: BaseService) {}

    public getPatients = async (req: Request, res: Response): Promise<void> => {
        const { pagination, data } = await this.patientService.getAll(req.query);
        
        if (data) {
            res.status(200).json({ patients: data, pager: pagination });
        } else {
            res.sendStatus(404);
        }
    }

    public getPatient = async (req: Request, res: Response): Promise<void> => {
        const patient = await this.patientService.getById(req.params.hn);
        
        if (patient) {
            res.status(200).json({ patient });
        } else {
            res.sendStatus(404);
        }
    }
}

export default PatientController;
