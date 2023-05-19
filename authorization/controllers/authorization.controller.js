import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../../common/config/env.config.js";

const login = async (req, res) => {
    try {
        let refreshId = req.body.user_id + config.jwt_secret;

        // Guarda o salt como propriedade do req.body (refreshKey)
        let salt = crypto.randomBytes(16).toString("base64");
        req.body.refreshKey = salt;
        let hash = crypto
            .createHmac("sha512", salt)
            .update(refreshId)
            .digest("base64");

        //! Gera um token JWT assinado em que chave secreta é dada pelo config.jwt_secret
        // O refreshKey é armazenado no token, permitindo que seja recuperado posteriormente
        let token = jwt.sign(req.body, config.jwt_secret);

        // Criptografando o hash e salvando ele na base64 como 'refresh_token'
        let b = Buffer.from(hash);
        let refresh_token = b.toString("base64");
        console.log(req.body);

        return res.status(201).send({
            accessToken: token,
            refreshToken: refresh_token,
        });
    } catch (err) {
        return res.status(500).send({ errors: err });
    }
};

const refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, config.jwt_secret, {
            expiresIn: "60m",
        });
        res.status(201).send({ id: token });
    } catch {
        res.status(500).send({ errors: err });
    }
};

const AuthorizationController = {
    login,
    refresh_token,
};

export default AuthorizationController;
