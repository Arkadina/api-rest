import AuthPermissionMiddleware from "../common/middlewares/auth.permission.middleware.js";
import AuthValidationMiddleware from "../common/middlewares/auth.validation.middleware.js";
import UserController from "./controllers/user.controllers.js";

// Permission levels: NORMAL_USER, PAID_USER & ADMIN

const routesConfig = (app) => {
    app.post("/users", UserController.insert);
    app.get("/users", [
        AuthValidationMiddleware.validJWTNeeded,
        AuthPermissionMiddleware.minimumPermissionLevelRequired("PAID_USER"),
        UserController.list,
    ]);
    app.get("/users/:userId", [
        AuthValidationMiddleware.validJWTNeeded,
        AuthPermissionMiddleware.minimumPermissionLevelRequired("NORMAL_USER"),
        AuthPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.getById,
    ]);
    app.patch("/users/:userId", [
        AuthValidationMiddleware.validJWTNeeded,
        AuthPermissionMiddleware.minimumPermissionLevelRequired("NORMAL_USER"),
        AuthPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.patchById,
    ]);
    app.delete("/users/:userId", [
        AuthValidationMiddleware.validJWTNeeded,
        AuthPermissionMiddleware.minimumPermissionLevelRequired("ADMIN"),
        UserController.removeById,
    ]);
};

export default routesConfig; 
