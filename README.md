# api-rest

This project is based on <a href="https://github.com/makinhs/rest-api-tutorial">another repository</a>. It was great to learn something that I had never seen before in my life, such as the JWT and Crypto libraries. It was also great to understand how Mongoose works with MongoDB and how we can handle middlewares to throw errors, authorize people through level permissions, and other stuff.

I also added comments to the code so that anyone who speaks Portuguese can understand more easily what is going on. Anyways, special thanks to makinhs.

## Libraries

express, nodemon, jsonwebtoken & mongoose.

Routes

| Route                          | Actions                | Method | Body                                 | Authorization (header)                          |
| ------------------------------ | ---------------------- | ------ | ------------------------------------ | ----------------------------------------------- |
| /users                         | Create user            | post   | firstName, LastName, email, password | /                                               |
| /auth                          | Login                  | post   | email, password                      | /                                               |
| /auth/refresh                  | Generate new jwt token | post   | refresh_token                        | Bearer jwt_token                                |
| /users - queries: limit & page | Get all users          | get    |                                      | Bearer jwt_token + permission level (PAID_USER) |
| /users/:user_id                | Get own user data      | get    |                                      | Bearer jwt_token                                |
| /users/:user_id                | Edit own user data     | patch  | firstName, LastName, email, password | Bearer jwt_token                                |
| /users/:user_id                | Delete user            | delete |                                      | Bearer jwt_token + permission level (ADMIN)     |

Config

```js
const config = {
    port: "",
    jwt_secret: "",
    mongodb_URI: "",
    permissionLevels: {
        NORMAL_USER: 1,
        PAID_USER: 4,
        ADMIN: 2048,
    },
};
```

Install

```batch
npm install
npm run dev
```
