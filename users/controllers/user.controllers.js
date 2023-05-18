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
        return res.status(409).send({ error: "email has already been used." });
    }

    const newUser = await UserModel.createUser(userData);

    return res.status(201).send({ id: newUser._id });
};

const list = async (req, res) => {
    const users = await UserModel.list(req.query.limit, req.query.page);
    // 200: ok
    res.status(200).send(users);
};

const getById = async (req, res) => {
    if (req.params.userId) {
        const user = await UserModel.findById(req.params.userId);
        return res.send(user);
    } else {
        // 400: bad request
        return res.status(400).send({ error: "user id is required." });
    }
};

const patchById = async (req, res) => {
    if (req.params.userId) {
        if (req.body.password) {
            let salt = crypto.randomBytes(16).toString("base64");
            let hash = crypto
                .createHmac("sha512", salt)
                .update(req.body.password)
                .digest("base64");
            req.body.password = salt + "$" + hash;
        }

        const new_user_data = await UserModel.patchUser(
            req.params.userId,
            req.body
        );

        // 200: ok
        return res.status(200).send(new_user_data);
    } else {
        // 400: bad request
        return res.status(400).send({ error: "user id is required." });
    }
};

const removeById = async (req, res) => {
    if (!req.params.userId) {
        return res.status(400).send({ error: "user id is required." });
    }

    const result = await UserModel.removeById(req.params.userId);
    if (result.deletedCount === 0) {
        // 400: bad request
        return res.status(400).send();
    } else {
        return res.status(200).send();
    }
};

const UserController = {
    insert,
    list,
    getById,
    patchById,
    removeById,
};

export default UserController;
