import express from "express";
import config from "./common/config/env.config.js";
const app = express();

import UserRoutesConfig from "./users/routes.config.js";
import AuthorizationRoutesConfig from "./authorization/routes.config.js";

app.use(function (req, res, next) {
    // CORS - Cross-Origin Resource Sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header(
        "Access-Control-Allow-Headers",
        "Accept, Authorization, Content-Type, X-Requested-With, Range"
    );
    if (req.method === "OPTIONS") {
        // OK
        return res.sendStatus(200);
    } else {
        // Passa o controle para o próximo middleware
        return next();
    }
});

app.use(express.json());

UserRoutesConfig(app);
AuthorizationRoutesConfig(app);

app.listen(config.port, () => {
    console.log("App listen at port %s", config.port);
});
