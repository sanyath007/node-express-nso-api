import { Knex } from 'knex';
import { BaseService } from './BaseService';

export default class PatientService implements BaseService {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    getAll(params: any): Promise<any> {
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

    getById(hn: string): Promise<any> {
        return this.db('patient')
                    .select("*")
                    .where("hn", hn);
    }
}