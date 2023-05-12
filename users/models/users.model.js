import mongoose from "./../../common/services/mongoose.service.js";
const Schema = mongoose.Schema;

// Criando o Schema do usuário
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number,
});

// userSchema.virtual('id') cria um campo virtual que não é armazenado no banco  de dados
userSchema.virtual("id").get(() => {
    return this._id.toHexString();
});

// Os campos virtuais são convertidos para JSON
userSchema.set("toJSON", {
    virtuals: true,
});

// Encontrar um usuário pelo id
userSchema.findById = (cb) => {
    return this.model("Users").find({ id: this.id }, cb);
};

// Modelo do usuário
const User = mongoose.model("Users", userSchema);

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const findByEmail = async (email) => {
    return await User.find({ email: email });
};

const checkIfUserExists = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) return true;
    return false;
};

const UserModel = {
    createUser,
    findByEmail,
    checkIfUserExists,
};

export default UserModel;
