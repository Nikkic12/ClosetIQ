import mongoose from "mongoose";

import { uploadSchema } from "./uploadModel.js";

export default mongoose.model("catalogue", uploadSchema);