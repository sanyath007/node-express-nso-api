import { Knex } from 'knex';
import { Patient } from '../models/Patient';
import { PatientWithPager } from '../models/PatientWithPager';
import { BaseRepository } from './base-repository';

export default class PatientRepository implements BaseRepository<PatientWithPager, Patient> {
    private readonly db: Knex;

    constructor(db: Knex, private tbName: string) {
        this.db = db;
    }

    public get qb(): Knex.QueryBuilder {
        return this.db(this.tbName);
    }

    public getAll(params: any): Promise<PatientWithPager> {
        const { page, ...rest } = params;
        
        return this.qb
                    .select("*")
                    .orderBy("hn", "desc")
                    .paginate({
                        perPage: 20,
                        currentPage: page !== '' ? page : 1,
                        isLengthAware: true
                    });
    }

    public getById(hn: string): Promise<Patient> {
        return this.qb
                    .select("*")
                    .where("hn", hn)
                    .first();
    }

    public store(data: Patient): Promise<Patient> {
        return this.qb.insert(data);
    }

    public update(hn: string, data: Patient): Promise<number> {
        return this.qb.where("hn", hn).update(data);
    }

    public delete(id: any): Promise<boolean> {
        return this.qb.where({ id }).delete();
    }
}