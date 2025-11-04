import express from "express";
import { generateSignature } from "../controllers/signUploadController.js";

const signUploadRouter = express.Router();

signUploadRouter.post("/", generateSignature);

export default signUploadRouter;