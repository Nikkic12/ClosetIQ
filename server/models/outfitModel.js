import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
    {
        // reference to user who uploaded
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        uploaderName: { type: String, required: true },

        // clothing items
        top: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: true},
        bottom: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: true},
        hat: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: true},
        shoes: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: true}
    }
);

export default mongoose.model("outfit", outfitSchema);