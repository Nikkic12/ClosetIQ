import express from "express";
import { createUpload } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post("/", createUpload);

export default uploadRouter;