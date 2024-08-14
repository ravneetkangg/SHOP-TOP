import mongoose from "mongoose";
import colors from "colors";

const connectDB = async(req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database ${conn.connection.host}`.bgMagenta.black)
    } catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.white);
    }
};

// this method of export used due to "type": "module" in package.json
export default connectDB;