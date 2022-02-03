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

    constructor(db: Knex) {
        this.db = db;
    }

    getAll(params: any): Promise<PatientWithPager> {
        const { page, ...rest } = params;
        
        return this.db('patient')
                    .select("*")
                    .orderBy("hn", "desc")
                    .paginate({
                        perPage: 20,
                        currentPage: page !== '' ? page : 1,
                        isLengthAware: true
                    });
    }

    getById(hn: string): Promise<Patient> {
        return this.db('patient')
                    .select("*")
                    .where("hn", hn)
                    .first();
    }

    store(data: Patient): Promise<Patient> {
        return this.db.insert(data);
    }

    update(hn: string, data: Patient): Promise<Patient> {
        return this.db.where("hn", hn).update(data);
    }
}