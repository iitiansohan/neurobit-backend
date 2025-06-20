
import jwt from "jsonwebtoken";
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const authenticate = async (req, res, next) => {
    //get token
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ success: false, message: "No token ,authorization denied" })
    }

    try {
        // console.log(authToken);
        const token = authToken.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //console.log(decoded.id)
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    }
    catch (err) {
        if (err.name == "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Token expired" })
        }

        return res.
            status(401)
            .json({ success: false, message: "Invalid token" })
    }
};

export const restrict = roles => async (req, res, next) => {
    //console.log(req.params.id);
    const userId = req.params.id;

    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
        user = patient;
    }
    if (doctor) {
        user = doctor;
    }

    if (!roles.includes(user.role)) {
        return res
            .status(401)
            .json({ success: false, message: "You are not authorised" })
    }
    next();
};