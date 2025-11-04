import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on("connected", () => {
        console.log("MongoDB database connected");
    });

    await mongoose.connect(process.env.ATLAS_URI, {
        dbName: 'closetiq_data'
    }); 
};

export default connectDB;

// require("dotenv").config({path: "./config.env"})
// const mongoose = require("mongoose");
// const connect = mongoose.connect(process.env.ATLAS_URI);

// connect.then(() => {
//     console.log("MongoDB connected successfully");
// })
// .catch(() => {
//     console.log("MongoDB failed to connect");
// })