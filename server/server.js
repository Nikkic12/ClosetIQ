// Express server code

import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import signUploadRoutes from "./routes/signUploadRoutes.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const port = process.env.PORT || 4000;

// allow this url to make API calls
const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// API endpoints
app.get("/", (req, res) => {
    res.send("API working");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRoutes);
app.use("/api/sign-upload", signUploadRoutes);

app.use(errorHandler); // use middleware

app.listen(port, () => {
    connectDB();
    console.log("Server started on port:", port);
});


// const express = require("express");
// const cors = require("cors");
// const app = express();
// const corsOptions = {
//     origin: ["http://localhost:5173"] // typical port used by vite
// };

// // run with "node server.js", ctrl+C to exit

// app.use(cors(corsOptions));

// // backend file
// app.get("/api", (req, res) => {
//     res.json({"fruits": ["apple", "backend data!!!!", "banana"]});
//     // sends a response that contains this array of fruits, can be accessed with fruits key
// });

// const port = 8080;
// app.listen(port, () => {
//     console.log("Server started on port:", port);
// });




// require("dotenv").config({path: "./config.env"})
// const mongoose = require("mongoose");
// const connect = mongoose.connect(process.env.ATLAS_URI);

// connect.then(() => {
//     console.log("MongoDB connected successfully");
// })
// .catch(() => {
//     console.log("MongoDB failed to connect");
// })

