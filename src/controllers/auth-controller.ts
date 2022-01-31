import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../config/auth/passport-handler';

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res:Response, next: NextFunction) => {
    passport.authenticate("local", { session: false }, (err: Error, user, info) => {
        if (err) return next(err);

        if (user) {
            const token = jwt.sign({ username: user.person_username }, process.env.JWT_SECRET as string);

            res.status(200).send({ token });
        } else {
            return res.status(401).json({ status: "error", code: "unauthorized" });
        }
    })(req, res, next)
});
