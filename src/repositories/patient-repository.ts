import { Knex } from 'knex';
import { Patient } from '../models/Patient';
import { PatientWithPager } from '../models/PatientWithPager';
import { IBaseRepository } from './base-repository';
import { KnexDbContext } from './KnexDbContext';

export default class PatientRepository extends KnexDbContext implements IBaseRepository<PatientWithPager, Patient> {
    constructor(db: Knex, tbName: string) {
        super(db, tbName);
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