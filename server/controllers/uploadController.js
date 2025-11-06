import uploadModel from "../models/uploadModel.js"
import catalogueModel from "../models/catalogueModel.js";
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