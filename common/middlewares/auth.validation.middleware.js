import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/env.config.js";

const validJWTNeeded = (req, res, next) => {
    if (req.headers["authorization"]) {
        let authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
            return res.status(401).send();
        }
        // Verifica o token passado pelo header 'authorization'
        req.jwt = jwt.verify(authorization[1], config.jwt_secret);
        return next();
    } else {
        return res.status(403).send();
    }
};

const verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        // Verifica se o refresh_token - que foi criado no login - está sendo enviado no corpo da requisição
        return next();
    } else {
        return res
            .status(400)
            .send({ error: "need to pass refresh_token field" });
    }
};

const validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, "base64");
    let refresh_token = b.toString("utf-8");

    let refreshId = req.jwt.user_id + config.jwt_secret;

    // req.jwt.refreshKey = salt
    let hash = crypto
        .createHmac("sha512", req.jwt.refreshKey)
        .update(refreshId)
        .digest("base64");


    if (hash === refresh_token) {
        req.body = req.jwt;
        // Envia para o próximo middleware para criar um novo token
        return next();
    } else {
        return res.status(400).send({ error: "invalid refresh token." });
    }
};

const AuthValidationMiddleware = {
    verifyRefreshBodyField,
    validJWTNeeded,
    validRefreshNeeded,
};

export default AuthValidationMiddleware;
