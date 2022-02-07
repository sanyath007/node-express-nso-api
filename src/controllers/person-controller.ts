import express, { Request, Response, NextFunction } from 'express';
import PersonRepository from '../repositories/person-repository';

/**
 * Controller Definitions
 */
export const personRouter = express.Router();
const personRepository = new PersonRepository();

// GET persons
personRouter.get("/", async (req: Request, res: Response) => {
    try {
        const persons = await personRepository.getAll();

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
        const person = await personRepository.getById(req.params.id);
        console.log(person);

        if (!person || person.length <= 0) {
            res.status(404).send(`Person id ${req.params.id} not found!!`)
        }

        res.status(200).json({ person });
    } catch {
        res.status(500).send("Something went wrong!!")
    }
});
