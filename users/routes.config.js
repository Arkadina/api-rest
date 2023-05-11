import UserController from "./controllers/user.controllers.js";

const routesConfig = (app) => {
    app.post("/users", UserController.insert);
};

export default routesConfig;
