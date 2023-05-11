import mongoose from "mongoose";
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
        .connect(
            `mongodb+srv://imastucia1990:QRnZzT4JVUfKWRuq@cluster0.npvvkfl.mongodb.net/?retryWrites=true&w=majority`,
            options
        )
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
