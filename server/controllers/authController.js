import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";
import userAuth from "../middleware/userAuth.js";

export const register = async (req, res) => {
    // need all 3 (name, email, password) to register
    const {name, email, password} = req.body;

    // if a field is blank, send alert
    if(!name || !email || !password) {
        return res.json({success: false, message: "Missing details"});
    }

    try {
        // if this variables it true, the email already exists in the database
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.json({success: false, message: "User already exists"});
        }
        
        // generate encrypted password to store in database
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a user
        const user = new userModel({name, email, password: hashedPassword});
    
        // save the user in MongoDB
        await user.save();
        
        // whenever a new user is made, generate an id for that user, and keep them logged in
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        // maxAge = 7 days in milliseconds

        // send a welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to ClosetIQ!",
            text: `Welcome to ClosetIQ! Your account has been created with email id: ${email}`
        }
        await transporter.sendMail(mailOptions); // send an email with the above listed options

        // user is successfully registered
        return res.json({success: true});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    // need only email and password to register
    const {email, password} = req.body;

    // if a field is blank, send alert
    if(!email || !password) {
        return res.json({success: false, message: "Email and password are required"});
    }

    try {
        // find a user with this email id
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "Invalid email"});
        }

        // check if the inputted password matches the password associated with the email
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: "Invalid password"});
        }

        // same cookie code as in register above
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // user is sucessfully logged in
        return res.json({success: true});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    try{
        // clear cookie, which said that the user was logged in
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })

        // user is successfully logged out
        return res.json({success: true, message: "Logged out"});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

// forgot password, send one-time password
export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        // check if account is already verified
        if(user.isAccountVerified) {
            return res.json({success: false, message: "Account already verified"});
        }

        // create random 6 digit one-time password
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // expiration date is 1 day

        await user.save();

        // send otp email for verifying email
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is: ${otp}. Verify your account using this OTP.`
        }
        await transporter.sendMail(mailOption);

        res.json({success: true, message: "Verification OTP sent to email"});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

// email to verify account email after account creation
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;
    
    if(!userId || !otp) {
        return res.json({success: false, message: "Missing details"});
    }

    try {
        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }
        if(user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.json({success: false, message: "Invalid OTP"});
        }
        if(user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "OTP expired"});
        }

        // verify account, remove otp data
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message: "Email verified successfully"});

    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
    // executed after middleware, meaning the user is authenticated
    try {
        return res.json({success: true});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

// send password reset otp
export const sendResetOtp = async (req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.json({success: false, message: "Email is required"});
    }

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "User not found"});
        }
        
        // again, create random one-time password
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // expire time is 15 minutes

        await user.save();

        // send another otp email for reseting password
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for resettig your password is: ${otp}. Reset your password using this OTP.`
        }
        await transporter.sendMail(mailOption);

        return res.json({success: true, message: "Password reset OTP sent to email"});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

// reset user password
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword) {
        return res.json({success: false, message: "Email, OTP, and new password are required"});
    }
    
    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }
        if(user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({success: false, message: "Invalid OTP"});
        }
        if(user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "OTP is expired"});
        }

        // set new password into the existing user in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: "Password has been reset successfully"});
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}