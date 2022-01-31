import { dbPerson } from "../config/database";

export default class UserService {
    async authenticate(username: string, password: string): Promise<any> {
        return await dbPerson('personal')
                        .select('*')
                        .where('person_username', username)
                        .where('person_password', password);
    }
}