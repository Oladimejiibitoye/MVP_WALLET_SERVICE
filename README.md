# MVP WALLET SERVICE

## Lendsqr Backend Engineer Assessment

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

You are required to build an MVP (Minimum viable product) wallet service where:

- A user can create an account
- A user can fund their account
- A user can transfer funds to another user’s account
- A user can withdraw funds from their account.

## Project Structure

│ .env
│ .env.sample
│ .gitignore
│ package-lock.json
│ package.json
│ README.md
│ tsconfig.json
│  
├───build
│  
│  
└───src
│ data-source.ts
│ index.ts
│  
 ├───common
│ ├───config
│ │ config.ts
│ │  
 │ └───model
│ sharedEntity.ts
│  
 ├───controller
│ AccountController.ts
│ AuthController.ts
│ UserController.ts
│  
 ├───entity
│ Account.ts
│ Transaction.ts
│ User.ts
│  
 ├───middleware
│ auth.ts
│  
 ├───migration
│ 1665951079543-migration.ts
│ 1665957455732-migration.ts
│ 1665964267191-migration.ts
│  
 └───routes
account.ts
auth.ts
user.ts

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run tsc
npm run start
```

For production environments...

```sh
npm run prod
```

## Endpoint

### Signup

{base_url}/api/auth/signup
method: post
json
{
"name": "string",
"email": "string",
"password": "string"
}

### Signin

{base_url}/api/auth/login
method: post
json
{
"email": "string",
"password": "string"
}

### Change Password

{base_url}/api/auth/change-password
method: patch
Authorization - Bearer Token
json
{
"oldPassword": "string",
"password": "string"
}

### Get Users

{base_url}/api/users
method: get

### Get User

{base_url}/api/users/user
Authorization - Bearer Token

### Create Account

{base_url}/api/account/create
method: post
Authorization - Bearer Token
json
{
"bank_name": "string"
}

### Fund Account

{base_url}/api/account/fund/{id}
method: post
Authorization - Bearer Token
Note: amount is in kobo
json
{
"amount": number
}

### Withdraw

{base_url}/api/account/withdraw/{id}
method: post
Authorization - Bearer Token
Note: amount is in kobo
json
{
"amount": number
}

### Transfer

{base_url}/api/account/transfer/{id}
method: post
Authorization - Bearer Token
Note: amount is in kobo
json
{
"amount": number,
"account_number": "string"
}

## Postman

## License

MIT
