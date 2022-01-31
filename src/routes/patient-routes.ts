import { Router } from "express";
import PatientController from "../controllers/patient-controller";
import PatientService from "../services/patient-service";
import { dbHos } from '../config/database';

const patientRouter = Router();
const ctrl: PatientController = new PatientController(new PatientService(dbHos));

patientRouter.get("/", ctrl.getPatients);
patientRouter.get("/:hn", ctrl.getPatient);

export default patientRouter;
