import { Router } from "express";
import PatientController from "../controllers/patient-controller";
import PatientRepository from "../repositories/patient-repository";
import { dbHos } from '../config/database';

const patientRouter = Router();
const ctrl: PatientController = new PatientController(new PatientRepository(dbHos, 'patient'));

patientRouter.get("/", ctrl.getPatients);
patientRouter.get("/:hn", ctrl.getPatient);

export default patientRouter;
