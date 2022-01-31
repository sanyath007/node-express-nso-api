import * as dotenv from 'dotenv';
import knex from 'knex';
import { attachPaginate } from 'knex-paginate';

dotenv.config();
attachPaginate();

export const dbPerson = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_PERSON_HOST,
        port: parseInt(process.env.DB_PERSON_PORT as string, 10),
        user: process.env.DB_PERSON_USER,
        password: process.env.DB_PERSON_PASS,
        database: process.env.DB_PERSON_DB,
    },
    pool: {
        min: 0,
        max: 7
    }
});

export const dbHos = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOS_HOST,
        port: parseInt(process.env.DB_HOS_PORT as string, 10),
        user: process.env.DB_HOS_USER,
        password: process.env.DB_HOS_PASS,
        database: process.env.DB_HOS_DB,
    },
    pool: {
        min: 0,
        max: 7,
        afterCreate: function(conn: any, done: any) {
            conn.query('SET NAMES utf8', (err: Error) => {
                done(err, conn);
            });
        }
    },
    debug: true
});
