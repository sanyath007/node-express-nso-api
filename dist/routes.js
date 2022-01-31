"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const person_controller_1 = require("./controllers/person-controller");
const homeRouter = (req, res) => {
    res.send("Hello, Knex!!");
};
exports.routes = [
    { path: "/home", handler: homeRouter },
    { path: "/api/persons", handler: person_controller_1.personRouter },
];
