import uploadModel from "../models/uploadModel.js"
import catalogueModel from "../models/catalogueModel.js";
import outfitModel from "../models/outfitModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";


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

export const UploadFromCatalogue = async (req, res, next) => {
    const {objectId} = req.body;

    // validate all required fields
    // if (!imgUrl || !primaryType || !secondaryType || !occasion || !color || !gender) {
    //     res.status(400);
    //     return next(new Error("All fields are required: imgUrl, primaryType, secondaryType, occasion, color, gender"));
    // }

    // expect userAuth middleware to have populated req.body.userId
    const userId = req.body.userId;
    if (!userId) {
        res.status(401);
        return next(new Error("Not authenticated"));
    }

    // get user data and name
    const user = await userModel.findById(userId).select("name");
    const uploaderName = user ? user.name : "Unknown";
    const data = await catalogueModel.findById(objectId);

        try {
            // create upload with all clothing details
            const upload = await uploadModel.create({
                imgUrl: data.imgUrl,
                user: userId,
                uploaderName: uploaderName,
                primaryType: data.primaryType,
                secondaryType: data.secondaryType,
                occasion: data.occasion,
                color: data.color,
                gender: data.gender
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

export const checkItemInOutfits = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "No ID provided" });

        // Find outfits containing this item
        const outfits = await outfitModel.find({
            $or: [
                { top: id },
                { bottom: id },
                { hat: id },
                { shoes: id }
            ]
        });

        res.json({ 
            success: true, 
            inOutfits: outfits.length > 0,
            outfitCount: outfits.length,
            outfits: outfits
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

export const deletePhotoController = async (req, res) => {
    try {
        const id = req.params.id;
        const { deleteOutfits } = req.body; // flag to confirm outfit deletion
        
        if (!id) return res.status(400).json({ error: "No ID provided" });

        // 1. Find the item in MongoDB
        const item = await uploadModel.findById(id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        // 2. Check if item is in any outfits
        const outfits = await outfitModel.find({
            $or: [
                { top: id },
                { bottom: id },
                { hat: id },
                { shoes: id }
            ]
        });

        // If item is in outfits and user hasn't confirmed deletion, return warning
        if (outfits.length > 0 && !deleteOutfits) {
            return res.status(409).json({ 
                error: "Item is in outfits",
                inOutfits: true,
                outfitCount: outfits.length,
                message: `This item is part of ${outfits.length} outfit(s). Deleting it will also delete the outfit(s).`
            });
        }

        // 3. Delete outfits containing this item if confirmed
        if (outfits.length > 0 && deleteOutfits) {
            await outfitModel.deleteMany({
                $or: [
                    { top: id },
                    { bottom: id },
                    { hat: id },
                    { shoes: id }
                ]
            });
            console.log(`Deleted ${outfits.length} outfits containing item ${id}`);
        }

        // 4. Delete from Cloudinary
        let publicIdToDelete = item.cloudinaryId;

        // Fallback: If cloudinaryId is not set or not the correct public ID, 
        // extract it from the full imgUrl, like you do in deleteAccount.
        if (!publicIdToDelete || publicIdToDelete.includes('http')) {
            // Get the public ID from the imgUrl
            if (item.imgUrl) {
                const parts = item.imgUrl.split('/upload/');
                if (parts.length > 1) {
                    // remove version prefix and file extension
                    publicIdToDelete = parts[1].replace(/^v\d+\//, '').replace(/\.[^/.]+$/, ''); 
                }
            }
        }

        // Delete from Cloudinary
        if (publicIdToDelete) {
            try {
              await cloudinary.uploader.destroy(publicIdToDelete);
              console.log(`Successfully deleted Cloudinary asset: ${publicIdToDelete}`);
            } catch (cloudErr) {
              console.error("Cloudinary deletion error for public ID:", publicIdToDelete, cloudErr);
              // Log the error but proceed to delete from MongoDB
            }
        } else {
            console.warn("No Cloudinary Public ID found for deletion.");
        }

        // 5. Delete from MongoDB
        await uploadModel.findByIdAndDelete(id);

        res.json({ 
            success: true, 
            message: "Photo deleted",
            outfitsDeleted: outfits.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
    

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

export const deleteOutfit = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "No outfit ID provided" });

        // Find and delete the outfit (only the outfit, not the clothing items)
        const outfit = await outfitModel.findById(id);
        if (!outfit) return res.status(404).json({ error: "Outfit not found" });

        // Delete only the outfit document from MongoDB
        await outfitModel.findByIdAndDelete(id);

        res.json({ 
            success: true, 
            message: "Outfit deleted (clothing items preserved)"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

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