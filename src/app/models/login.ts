import { Role } from './role';

export class User {
    loginId: string;
    password: string;
    roles: Role[];
    longName: string;
   
}