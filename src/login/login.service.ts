import { getUserWithRoles } from "./login.repository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { LoginDTO } from "../login/login.dto";
import { LoginError } from "./errors/login.error";

export const login = async (body: LoginDTO): Promise<string> => {
    const user = await getUserWithRoles(body.login);

    if(user) {
        if (bcrypt.compareSync(body.password, user.password)) {
            const token = jwt.sign({login: user.login, roles: user.roles}, process.env.SECRET!);
            return token;
        } else {
            throw new LoginError();
        }
        
    } else {
        throw new LoginError();
    }
}
