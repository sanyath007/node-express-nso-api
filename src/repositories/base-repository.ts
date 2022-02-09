import { Knex } from "knex";

export interface IBaseRepository<T, U> {
    getAll(params: any): Promise<T>;
    getById(id: any): Promise<U>;
    store(data: U): Promise<U>;
    update(id: any, data: U): Promise<number>
    delete(id: any): Promise<boolean>
}