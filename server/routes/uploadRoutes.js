import express from "express";
import { createUpload, createOutfit, getCatalogueItems, getUserClothing, getUserOutfits } from "../controllers/uploadController.js";
import userAuth from "../middleware/userAuth.js";

const uploadRouter = express.Router();

// use userAuth middlware so we know who is logged in
uploadRouter.post("/", userAuth, createUpload);
uploadRouter.post("/createOutfit", userAuth, createOutfit);

uploadRouter.get("/getCatalogueItems", getCatalogueItems);
uploadRouter.get("/getUserClothing", getUserClothing);
uploadRouter.get("/getUserOutfits", getUserOutfits);

export default uploadRouter;