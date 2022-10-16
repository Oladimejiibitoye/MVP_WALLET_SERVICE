import { Entity, Column, BeforeInsert } from "typeorm"
import { SharedEntity } from "../common/model/sharedEntity";
import * as bcrypt from "bcryptjs";
import { Length, IsNotEmpty, IsEmail, IsAlphanumeric } from "class-validator";



@Entity()
export class User extends SharedEntity{

    @Column()
    @Length(4, 200)
    @IsNotEmpty()
    name: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(8, 20)
    password: string;
    
    @BeforeInsert()
    public setPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
        return this.password;
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }

}
