import { IsEnum } from "class-validator";
import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, OneToMany, TransactionNotStartedError } from "typeorm"
import { SharedEntity } from "../common/model/sharedEntity";
import { Transaction } from "./Transaction";
import { User } from "./User";

export type Banks = 'gtb' | 'firstbank' | 'providus'

@Entity()
export class Account extends SharedEntity{

    @Column({nullable: true})
    account_name: string;

    @Column({nullable: true})
    account_number: string;

    @Column({
      type: 'enum',
      enum: ['gtb', 'firstbank', 'providus'],
      default: 'gtb'
    })
    @IsEnum(['gtb', 'firstbank', 'providus'])
    bank_name: Banks;

    @Column({nullable: true})
    balance: number

    @OneToOne(() => User, user => user.account)
    @JoinColumn()
    user: User;

    @OneToMany(() => Transaction, transactions => transactions.account )
    transactions: Transaction[]

    @BeforeInsert()
    public setBalance() {
        this.balance = this.balance * 100;
        return this.balance;
    }
}