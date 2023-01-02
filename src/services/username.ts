import { generateUsername } from "unique-username-generator";
import {
    getRndInteger,
    getRndChars,
} from "./../utils";

class UsernameService {
    generate(): string {
        const randomLength = getRndInteger(18, 22);
        const randomDigits = getRndInteger(2, 4);
        const randomChars = getRndChars(randomDigits);
        return generateUsername(randomChars, randomDigits, randomLength);
    }
}

export default new UsernameService();
