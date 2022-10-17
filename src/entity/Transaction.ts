import { Entity, Column, ManyToOne } from "typeorm"
import { SharedEntity } from "../common/model/sharedEntity";
import { Account } from "./Account";
import { User } from "./User";

export type Banks = 'gtb' | 'firstbank' | 'providus'

@Entity()
export class Transaction extends SharedEntity{

    @Column({nullable: true})
    type: string

    @Column({nullable: true})
    status: string;

    @Column({nullable: true})
    balance: number;

    @Column({nullable: true})
    amount: number;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @ManyToOne(() => User, user => user.transactions)
    user: User;

}