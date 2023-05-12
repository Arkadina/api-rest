const login = (req, res) => {
    console.log(req.body);
};

const refresh_token = (req, res) => {};

const AuthorizationController = {
    login,
    refresh_token,
};

export default AuthorizationController;
