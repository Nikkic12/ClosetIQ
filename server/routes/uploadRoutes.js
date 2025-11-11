import express from "express";
import { createUpload, getCatalogueItems, getUserClothing, getUserOutfits } from "../controllers/uploadController.js";
import userAuth from "../middleware/userAuth.js";

const uploadRouter = express.Router();

// use userAuth middlware so we know who is logged in
uploadRouter.post("/", userAuth, createUpload);

uploadRouter.get("/getCatalogueItems", getCatalogueItems);
uploadRouter.get("/getUserClothing", getUserClothing);
uploadRouter.get("/getUserOutfits", getUserOutfits);


export default uploadRouter;