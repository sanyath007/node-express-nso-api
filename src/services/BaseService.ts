import { Knex } from "knex";

export interface BaseService<T, U> {
    db: any;
    getAll(params: any): Promise<T>;
    getById(id: any): Promise<U>;
    store(data: U): Promise<U>;
    update(id: any, data: U): Promise<U>
}