import { Request, Response } from 'express';
import passport from 'passport';
import { authRouter } from '../controllers/auth-controller';
import { personRouter } from '../controllers/person-controller';
import patientRouter from './patient-routes';

const homeRouter = (req: Request, res: Response) => {
    res.send("Hello, Knex!!")
};

export const routes: any[] = [
    { path: "/auth", middlewares: [], handler: authRouter },
    {
        path: "/api/persons",
        middlewares: [passport.authenticate("jwt", { session: false })],
        handler: personRouter
    },
    {
        path: "/api/patients",
        middlewares: [passport.authenticate("jwt", { session: false })],
        handler: patientRouter
    },
    { path: "/", middlewares: [], handler: homeRouter },
];
