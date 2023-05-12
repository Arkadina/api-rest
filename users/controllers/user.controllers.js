import UserModel from "../models/users.model.js";
import crypto from "crypto";

const insert = async (req, res) => {
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

    const existingUser = await UserModel.checkIfUserExists(email);

    if (existingUser) {
        return res.status(409).send({ error: "Email has already been used" });
    }

    const newUser = await UserModel.createUser(userData);

    return res.status(201).send({ id: newUser._id });
};

const UserController = {
    insert,
};

export default UserController;
