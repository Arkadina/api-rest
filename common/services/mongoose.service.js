import mongoose from "mongoose";
import config from "../config/env.config.js";
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Conectando com o MongoDB

const connectWithRetry = () => {
    console.log("MongoDB connection with retry");
    mongoose
        .connect(config.mongodb_URI, options)
        .then(() => {
            console.log("MongoDB is connected.");
        })
        .catch((err) => {
            console.log(
                "MongoDB connection unsuccessful, retry after 5 seconds."
            );
            console.log(`Error: ${err}`);
            count++;
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

// Exporta o mongoose para ser usado em outros arquivos já conectando ao MongoDB
export default mongoose;
