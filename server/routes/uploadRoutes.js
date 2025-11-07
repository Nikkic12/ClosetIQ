import express from "express";
import { createUpload, getCatalogueItems } from "../controllers/uploadController.js";
import userAuth from "../middleware/userAuth.js";

const uploadRouter = express.Router();

// use userAuth middlware so we know who is logged in
uploadRouter.post("/", userAuth, createUpload);

uploadRouter.get("/getCatalogueItems", getCatalogueItems);

export default uploadRouter;