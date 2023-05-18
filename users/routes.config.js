import AuthPermissionMiddleware from "../common/middlewares/auth.permission.middleware.js";
import AuthValidationMiddleware from "../common/middlewares/auth.validation.middleware.js";
import UserController from "./controllers/user.controllers.js";

// Permission levels: NORMAL_USER, PAID_USER & ADMIN

const routesConfig = (app) => {
    app.post("/users", UserController.insert);
};

export default routesConfig;
