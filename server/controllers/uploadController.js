import uploadModel from "../models/uploadModel.js";

export const createUpload = async (req, res, next) => {
    const { imgUrl } = req.body;

    if(!imgUrl) {
        res.status(400);
        return next(new Error("imgUrl field is required"));
    }

    try {
        const upload = await uploadModel.create({ imgUrl });

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