import { dbPerson } from "../config/database";

export default class UserRepository {
    authenticate(username: string, password: string): Promise<any> {
        return dbPerson('personal')
                        .select('*')
                        .where('person_username', username)
                        .where('person_password', password);
    }
}