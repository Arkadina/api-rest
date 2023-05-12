import crypto from "crypto";
import UserModel from "../../users/models/users.model.js";

const hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (!req.body.email) {
        errors.push("Missing email field");
    }

    if (!req.body.password) {
        errors.push("Missing password field");
    }

    if (errors.length) {
        return res.status(400).send({ errors: errors.join(", ") });
    }

    return next();
};

const isPasswordAndUserMatch = async (req, res, next) => {
    let { email, password } = req.body;

    // Retorna um array com as informações dos usuários com o email passado como parâmetro
    const user = await UserModel.findByEmail(email);

    if (user.length > 0) {
        // Criptografia da senha quando usuário é criado:
        // let salt = crypto.randomBytes(16).toString("base64");
        // let hash = crypto
        //     .createHmac("sha512", salt)
        //     .update(req.body.password)
        //     .digest("base64");

        // password = salt + "$" + hash;

        let passwordFields = user[0].password.split("$");

        let salt = passwordFields[0];
        let hash = crypto
            .createHmac("sha512", salt)
            .update(password)
            .digest("base64");

        // Uma observação interessante é que estamos realizando uma verificação de igualdade entre hashes. Ao receber a senha já criptografada do banco de dados, podemos extrair o "salt" gerado a partir dessa senha e, em seguida, criptografar a senha fornecida pelo usuário usando esse "salt". Dessa forma, podemos comparar as hashes resultantes para verificar se são iguais, tudo isso sem a necessidade de descriptografar a senha.

        if (hash === passwordFields[1]) {
            //  req.body é atualizado com as informações do banco de dados e enviado para o próximo Middleware
            req.body = {
                user_id: user[0]._id,
                email: user[0].email,
                permissionLevel: user[0].permissionLevel,
                provider: "email",
                name: `${user[0].firstName} ${user[0].lastName}`,
            };

            return next();
        }
    }

    return res.status(400).send({ errors: "Invalid email or password" });
};

const VerifyUserMiddleware = {
    hasAuthValidFields,
    isPasswordAndUserMatch,
};

export default VerifyUserMiddleware;
