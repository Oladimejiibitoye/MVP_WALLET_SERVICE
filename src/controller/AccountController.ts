import { NextFunction, Request, Response } from "express"
import { Account } from "../entity/Account";
import { User } from "../entity/User"; 
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";


class AccountController{

  static CreateAccount = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      const { bank_name } = req.body
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;
    
    //Get the user from database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({ where: { id } });
    if (!user){
      return res.status(404).send({
          message: "User not found"});
    }
    let account = new Account();
    account.account_name = user.name;
    account.account_number = `${Math.round(Math.random() * 1E10)}`;
    account.bank_name = bank_name;
    account.balance = 0;
    account.user = user

    //Validate if the parameters are ok
    const errors = await validate(account);
    if(errors.length > 0){
      res.status(400).send(errors);
      return;
    }
    //Try to save. If fails, the email is already in use
    const accountRepository = AppDataSource.getRepository(Account)
    try {
      await accountRepository.save(account);
    } catch (e) {
      console.log(e)
      res.status(409).send({
        message: e.message});
      return;
    }
    return res.status(201).json({
      message: "✅ Account created",
      account
    })
    } catch (error) {
      next(error)
    }
    
  }

  static FundAccount = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      const { amount } = req.body
    
      const id = req.params.id;

      if(amount < 10000 && !amount){
        return res.status(400).send({
          message: "invalid request"
        })
      }
      //Get ID from JWT
      const userId = res.locals.jwtPayload.userId;
      //Get the user from database
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id: userId } });
      if (!user){
        return res.status(404).send({
            message: "User not found"});
      }
      
      //Get the account from database
      const accountRepository = AppDataSource.getRepository(Account);
      const account = await accountRepository.findOneOrFail({ where: { id } });
      if (!account){
        return res.status(404).send({
            message: "User not found"});
      }
      const newBalance = account.balance + amount;
      account.balance = newBalance

      await accountRepository.save(account)
      let transaction = new Transaction();
      transaction.type = "Credit";
      transaction.status = "Successful";
      transaction.balance = account.balance;
      transaction.amount = amount;
      transaction.account = account;
      transaction.user = user

      const transactionRepository = AppDataSource.getRepository(Transaction);
      await transactionRepository.save(transaction);
  
      return res.status(201).json({
        message: "✅ Account Funded Successfully",
        transaction: transaction
      })
    } catch (error) {
      next(error)
    }
  }

  static withdrawFromAccount = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      const { amount } = req.body
    
      const id = req.params.id;

      if(amount < 10000 && !amount){
        return res.status(400).send({
          message: "invalid request"
        })
      }
      //Get ID from JWT
      const userId = res.locals.jwtPayload.userId;
      //Get the user from database
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id: userId } });
      if (!user){
        return res.status(404).send({
            message: "User not found"});
      }
      
      //Get the account from database
      const accountRepository = AppDataSource.getRepository(Account);
      const account = await accountRepository.findOneOrFail({ where: { id } });
      if (!account){
        return res.status(404).send({
            message: "User not found"});
      }
      const newBalance = account.balance - amount;
      account.balance = newBalance

      await accountRepository.save(account)
      let transaction = new Transaction();
      transaction.type = "Debit";
      transaction.status = "Successful";
      transaction.balance = account.balance;
      transaction.amount = amount;
      transaction.account = account;
      transaction.user = user

      const transactionRepository = AppDataSource.getRepository(Transaction);
      await transactionRepository.save(transaction);
  
      return res.status(201).json({
        message: "✅ Amount withdrawn Successfully",
        transaction: transaction
      })
    } catch (error) {
      next(error)
    }
  }

  static TransferToOtherAccount = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      const { amount, account_number } = req.body
    
      const id = req.params.id;

      if(amount < 10000 && !amount){
        return res.status(400).send({
          message: "invalid request"
        })
      }
      //Get ID from JWT
      const userId = res.locals.jwtPayload.userId;
      //Get the user from database
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { id: userId } });
      if (!user){
        return res.status(404).send({
            message: "User not found"});
      }
      
      //Get the account from database
      const accountRepository = AppDataSource.getRepository(Account);
      const account = await accountRepository.findOneOrFail({ where: { id } });
      if (!account){
        return res.status(404).send({
            message: "User not found"});
      }
      const newBalance = account.balance - amount;
      account.balance = newBalance

      await accountRepository.save(account)

      //Get other account from the database
      const otherAccount = await accountRepository.findOneOrFail({where: {account_number}})
      if(!otherAccount){
        account.balance = newBalance + amount
        await accountRepository.save(account)
        return res.status(400).send({
          message: "Account holder not found"
        })
      }
      const otherNewBalance = otherAccount.balance + amount;
      otherAccount.balance = otherNewBalance;
      await accountRepository.save(otherAccount);
      let transaction = new Transaction();
      transaction.type = "Debit";
      transaction.status = "Successful";
      transaction.balance = account.balance;
      transaction.amount = amount;
      transaction.account = account;
      transaction.user = user

      const transactionRepository = AppDataSource.getRepository(Transaction);
      await transactionRepository.save(transaction);
  
      return res.status(201).json({
        message: "✅ Transfer Successfully",
        transaction: transaction
      })
    } catch (error) {
      next(error)
    }
  }

  

  

}

export default AccountController