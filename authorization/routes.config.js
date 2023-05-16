import AuthValidationMiddleware from "../common/middlewares/auth.validation.middleware.js";
import AuthorizationController from "./controllers/authorization.controller.js";
import VerifyUserMiddleware from "./middlewares/verify.user.middleware.js";

const routesConfig = (app) => {
    app.post("/auth", [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login,
    ]);

    app.post("/auth/refresh", [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login,
    ]);
};

export default routesConfig;
