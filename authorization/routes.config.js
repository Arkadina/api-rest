import AuthorizationController from "./controllers/authorization.controller.js";
import VerifyUserMiddleware from "./middlewares/verify.user.middleware.js";

const routesConfig = (app) => {
    app.post("/auth", [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login,
    ]);

    app.post("auth/refresh", []);
};

export default routesConfig;
