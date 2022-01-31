import { Knex } from "knex";

export interface BaseService {
    db: Knex;
    getAll(params: any): Promise<any>;
    getById(id: any): Promise<any>;
}