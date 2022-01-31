import { dbPerson } from "../config/database"

export default class PersonService {
    async getAll(): Promise<any[]> {
        return await dbPerson('personal')
                        .select('*')
                        .join('position', 'personal.position_id', '=', 'position.position_id')
                        .join('academic', 'personal.ac_id', '=', 'academic.ac_id');
    }

    async getById(id: string): Promise<any> {
        return await dbPerson('personal')
                        .select()
                        .join('position', 'personal.position_id', '=', 'position.position_id')
                        .join('academic', 'personal.ac_id', '=', 'academic.ac_id')
                        .where('person_id', id);   
    }
}