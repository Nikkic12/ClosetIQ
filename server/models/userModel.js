import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // Essential account information
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    // One-time password stuff
    verifyOtp: {type: String, default: ""},
    verifyOtpExpireAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ""},
    resetOtpExpireAt: {type: Number, default: 0},
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;