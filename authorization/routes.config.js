import AuthorizationController from "./controllers/authorization.controller.js";
import VerifyUserMiddleWare from "./middlewares/verify.user.middleware.js";

const routesConfig = (app) => {
    app.get("/auth", [
        VerifyUserMiddleWare.hasAuthValidFields,
        AuthorizationController.login,
    ]);

    app.get("auth/refresh", []);
};

export default routesConfig;
