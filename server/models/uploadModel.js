import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
    {
        // reference to user who uploaded
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        uploaderName: { type: String, required: true },
        imgUrl: { type: String, required: true },
        cloudinaryId: { type: String, required: true },

        // clothing characteristics
        primaryType: {type: String, required: true},
        secondaryType: {type: String, required: true},
        occasion: {type: String, required: true},
        color: {type: String, required: true},
        gender: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export { uploadSchema };

export default mongoose.model("upload", uploadSchema);