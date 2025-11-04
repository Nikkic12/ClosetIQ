import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
    {
        imgUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("upload", uploadSchema);