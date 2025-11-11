import express from "express";
import { createOutfit } from "../controllers/outfitController.js";
import userAuth from "../middleware/userAuth.js";

const outfitRouter = express.Router();

// use userAuth middleware so we know who is logged in
outfitRouter.post("/", userAuth, createOutfit);

export default outfitRouter;