import express from "express";
import { createUpload, createOutfit, getCatalogueItems, getUserClothing, getUserOutfits,UploadFromCatalogue  } from "../controllers/uploadController.js";
import userAuth from "../middleware/userAuth.js";

const uploadRouter = express.Router();

// use userAuth middlware so we know who is logged in
uploadRouter.post("/", userAuth, createUpload);
uploadRouter.post("/createOutfit", userAuth, createOutfit);
uploadRouter.post("/uploadFromCatalogue", userAuth, UploadFromCatalogue);

uploadRouter.get("/getCatalogueItems", getCatalogueItems);
uploadRouter.get("/getUserClothing", getUserClothing);
uploadRouter.get("/getUserOutfits", getUserOutfits);

export default uploadRouter;