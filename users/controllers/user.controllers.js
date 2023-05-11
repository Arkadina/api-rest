import UserModel from "../models/users.model.js";
import crypto from "crypto";

const UserController = {
    insert: (req, res) => {
        let { firstName, lastName, email, password } = req.body;

        // Criptografia 
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto
            .createHmac("sha512", salt)
            .update(req.body.password)
            .digest("base64");

        password = salt + "$" + hash;

        let userData = {
            firstName,
            lastName,
            email,
            password,
            permissionLevel: 1,
        };

        UserModel.createUser(userData).then((result) => {
            res.status(201).send({ id: result._id });
        });
    },
};

export default UserController;
