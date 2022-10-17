import "reflect-metadata"
import { DataSource } from "typeorm"
import { dbName, dbPassword, dbUsername } from "./common/config/config"
import { Account } from "./entity/Account"
import { Transaction } from "./entity/Transaction"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    synchronize: false,
    logging: false,
    entities: [
      User, Account, Transaction
     ],
     migrations: [
      'build/migration/*.js'
     ],
     subscribers: [],

})

