import { Knex } from 'knex';
import { IWithPagination } from 'knex-paginate';
import { Pager } from '../models/Pager';
import { Patient } from '../models/Patient';
import { BaseService } from './BaseService';

interface PatientWithPager {
    data: Patient[];
    pagination: Pager;
}

export default class PatientService implements BaseService<PatientWithPager, Patient> {
    db: Knex;

    constructor(db: Knex, private tbName: string) {
        this.db = db;
    }

    get qb(): Knex.QueryBuilder {
        return this.db(this.tbName);
    }

    getAll(params: any): Promise<PatientWithPager> {
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

    getById(hn: string): Promise<Patient> {
        return this.qb
                    .select("*")
                    .where("hn", hn)
                    .first();
    }

    store(data: Patient): Promise<Patient> {
        return this.qb.insert(data);
    }

    update(hn: string, data: Patient): Promise<number> {
        return this.qb.where("hn", hn).update(data);
    }

    delete(id: any): Promise<boolean> {
        return this.qb.where({ id }).delete();
    }
}