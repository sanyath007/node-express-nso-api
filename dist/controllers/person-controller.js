"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personRouter = void 0;
const express_1 = __importDefault(require("express"));
const person_service_1 = __importDefault(require("../services/person-service"));
/**
 * Controller Definitions
 */
exports.personRouter = express_1.default.Router();
const personService = new person_service_1.default();
// GET persons
exports.personRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const persons = yield personService.getAll();
        if (!persons || persons.length <= 0) {
            res.status(404).send("Persons is empty!!");
        }
        res.status(200).json({ persons });
    }
    catch (_a) {
        res.status(500).send("Something went wrong!!");
    }
}));
// GET persons/:id
exports.personRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield personService.getById(req.params.id);
        console.log(person);
        if (!person || person.length <= 0) {
            res.status(404).send(`Person id ${req.params.id} not found!!`);
        }
        res.status(200).json({ person });
    }
    catch (_b) {
        res.status(500).send("Something went wrong!!");
    }
}));
