import jwt from "jsonwebtoken";

// used to create API endpoint
const userAuth = async (req, res, next) => {
    // but the userId in req.body using a token
    // find token from cookie, find userId from token
    const {token} = req.cookies;

    if(!token) {
        return res.json({success: false, message: "Not authorized, login again"})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken.id) {
            // Initialize body first bc it's undefined (fixes the error: Error: Cannot set properties of undefined (setting 'userId'))
            req.body = req.body || {}; 
            req.body.userId = decodedToken.id;
        }
        else {
            return res.json({success: false, message: "Not authorized, login again"});
        }

        next();
    }
    catch(error) {
        res.json({success: false, message: error.message});
    }
}

export default userAuth;