import config from "../config/env.config.js";

const minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permissionLevel);

        if (
            user_permission_level >=
            parseInt(config.permissionLevels[required_permission_level])
        ) {
            return next();
        } else {
            // 403: forbidden
            return res.status(403).send();
        }
    };
};

const onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.user_id;

    if (
        user_permission_level === parseInt(config.permissionLevels.ADMIN) ||
        userId === req.params.user_id
    ) {
        return next();
    } else {
        // 403: forbidden
        return res.status(403).send();
    }
};

const sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.user_id;
    if (userId !== req.params.user_id) {
        next();
    } else {
        // 400: bad request
        return res.status(400).send();
    }
};

const AuthPermissionMiddleware = {
    minimumPermissionLevelRequired,
    onlySameUserOrAdminCanDoThisAction,
    sameUserCantDoThisAction,
};

export default AuthPermissionMiddleware;
