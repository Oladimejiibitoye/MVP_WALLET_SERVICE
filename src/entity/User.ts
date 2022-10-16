import { pbkdf2Sync, randomBytes } from "crypto";
import { Entity, Column, BeforeInsert } from "typeorm"
import { SharedEntity } from "../common/model/sharedEntity";

@Entity()
export class User extends SharedEntity{

    @Column()
    Name: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @BeforeInsert()
    public setPassword() {
        let salt = randomBytes(32).toString('hex');
        let hash = pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString(
        'hex',
        );
        let hashedPassword = `${salt}:${hash}`;
        this.password = hashedPassword;
        return this.password;
    }

}
