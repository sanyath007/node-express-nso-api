import express, { Request, Response, NextFunction } from 'express';
import PersonService from '../services/person-service';

/**
 * Controller Definitions
 */
export const personRouter = express.Router();
const personService = new PersonService();

// GET persons
personRouter.get("/", async (req: Request, res: Response) => {
    try {
        const persons = await personService.getAll();

        if (!persons || persons.length <= 0) {
            res.status(404).send("Persons is empty!!")
        }

        res.status(200).json({ persons });
    } catch {
        res.status(500).send("Something went wrong!!")
    }
});

// GET persons/:id
personRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const person = await personService.getById(req.params.id);
        console.log(person);

        if (!person || person.length <= 0) {
            res.status(404).send(`Person id ${req.params.id} not found!!`)
        }

        res.status(200).json({ person });
    } catch {
        res.status(500).send("Something went wrong!!")
    }
});
