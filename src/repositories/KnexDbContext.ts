import { Knex } from "knex";

export class KnexDbContext {
    private readonly db: Knex;
    private readonly tbName: string;

    constructor(db: Knex, tbName: string) {
        this.db = db;
        this.tbName = tbName;
    }

    public get qb(): Knex.QueryBuilder {
        return this.db(this.tbName);
    }
}