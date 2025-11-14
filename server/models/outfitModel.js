import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
    {
        // reference to user who uploaded
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        uploaderName: { type: String, required: true },

        // clothing items, require false since they are not all option (some may be null)
        top: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: false},
        bottom: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: false},
        hat: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: false},
        shoes: {type: mongoose.Schema.Types.ObjectId, ref: 'upload', required: false}
    }
);

export default mongoose.model("outfit", outfitSchema);