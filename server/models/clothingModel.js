import mongoose from "mongoose";

const clothingSchema = new mongoose.Schema({
    imgUrl: {type: String, required: true},
    type: {type: String, required: true},
    color: {type: String, required: true}
});

const clothingModel = mongoose.models.clothing || mongoose.model("catalogue", clothingSchema);

export default clothingModel;