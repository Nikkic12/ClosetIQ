import uploadModel from "../models/uploadModel.js"
import catalogueModel from "../models/catalogueModel.js";
import outfitModel from "../models/outfitModel.js";
import userModel from "../models/userModel.js";

export const createUpload = async (req, res, next) => {
    const { imgUrl, primaryType, secondaryType, occasion, color, gender } = req.body;

    // validate all required fields
    if (!imgUrl || !primaryType || !secondaryType || !occasion || !color || !gender) {
        res.status(400);
        return next(new Error("All fields are required: imgUrl, primaryType, secondaryType, occasion, color, gender"));
    }

    // expect userAuth middleware to have populated req.body.userId
    const userId = req.body.userId;
    if (!userId) {
        res.status(401);
        return next(new Error("Not authenticated"));
    }

    // get user data and name
    const user = await userModel.findById(userId).select("name");
    const uploaderName = user ? user.name : "Unknown";

    if (uploaderName == "Catalogue") {
        try {
            // create upload with all clothing details
            const upload = await catalogueModel.create({
                imgUrl,
                user: userId,
                uploaderName,
                primaryType,
                secondaryType,
                occasion,
                color,
                gender
            });

            res.status(201).json({
                success: true,
                upload
            });
        }
        catch (error) {
            console.log(error);
            res.status(500);
            next(error);
        }
    }
    else {
        try {
            // create upload with all clothing details
            const upload = await uploadModel.create({
                imgUrl,
                user: userId,
                uploaderName,
                primaryType,
                secondaryType,
                occasion,
                color,
                gender
            });

            res.status(201).json({
                success: true,
                upload
            });
        }
        catch (error) {
            console.log(error);
            res.status(500);
            next(error);
        }
    }
}

export const createOutfit = async (req, res, next) => {
    const { top, bottom, hat, shoes } = req.body;

    // validate all required fields
    if (!top && !bottom && !hat && !shoes) {
        res.status(400);
        return next(new Error("At least one field required: top, bottom, hat, shoes"));
    }

    // expect userAuth middleware to have populated req.body.userId
    const userId = req.body.userId;
    if (!userId) {
        res.status(401);
        return next(new Error("Not authenticated"));
    }

    // get user data and name
    const user = await userModel.findById(userId).select("name");
    const uploaderName = user ? user.name : "Unknown";

    try {
        // create outfit with given clothing items
        const outfit = await outfitModel.create({
            user: userId,
            uploaderName,
            top,
            bottom,
            hat,
            shoes
        });

        res.status(201).json({
            success: true,
            outfit
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
        next(error);
    }
}

export const getUploadsByUser = async (req, res, next) => {
    // expect userAuth middleware to have populated req.body.userId
    const userId = req.body.userId;
    if (!userId) {
        res.status(401);
        return next(new Error("Not authenticated"));
    }
    try {
        const uploads = await uploadModel.find({ user: userId });

        res.status(200).json({
            success: true,
            uploads
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
        next(error);
    }
}

export const getCatalogueItems = async (req, res, next) => {
    try {
        const items = await catalogueModel.find({});

        res.status(200).json({
            success: true,
            items
        });
    } 
    catch(error){
        console.log(error);
        res.status(500);
        next(error);
    }
}

export const getUserClothing = async (req, res, next) => {
    try {
        const items = await uploadModel.find({});

        res.status(200).json({
            success: true,
            items
        });
    } 
    catch(error){
        console.log(error);
        res.status(500);
        next(error);
    }
}

export const getUserOutfits = async (req, res, next) => {
    try {
        const items = await outfitModel.find({})
            .populate('hat')
            .populate('top')
            .populate('bottom')
            .populate('shoes');

        res.status(200).json({
            success: true,
            items
        });
    } 
    catch(error){
        console.log(error);
        res.status(500);
        next(error);
    }
}