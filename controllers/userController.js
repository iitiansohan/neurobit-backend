import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import doc from "../assets/doctor.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        res
            .status(200)
            .json({ success: true, message: "Successfully updated", data: updatedUser });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "Failed to update" });
    }
}


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id)

        res
            .status(200)
            .json({ success: true, message: "Successfully deleted" });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "Failed to delete" });
    }
}


export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");

        res
            .status(200)
            .json({ success: true, message: "Successfully fetched user", data: user });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "No such user exists" });
    }
}


export const getUsers = async (req, res) => {
    const id = req.params.id;
    try {
        const users = await User.find({}).select("-password");

        res
            .status(200)
            .json({ success: true, message: "Successfully fetched users", data: users });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "Failed to fetch users" });
    }
}


export const getUserProfile = async(req,res)=>{

    const userId = req.userId;
    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({success:false, message: 'User not found'})
        }
        const {password, ...rest} = user._doc
        res.status(200).json({success:true, message: 'Getting profile info',data:{...rest}})
        
    } catch (error) {
        res.status(500).json({success:false, message:"something went wrong"});
    }
}

export const getMyAppointment = async (req, res) => {
  try {
    // Get all bookings made by the logged-in user
    const bookings = await Booking.find({ userID: req.userId });

    // Extract doctor IDs from those bookings
    const doctorIds = bookings.map(el => el.doctorID);

    //as of now the doctor list is hardcoded
    const doctors = doc.filter(d => doctorIds.includes(d._id));
    //when dynamic doctor list is used
    //const doctors=await Doctor.find({_id:{$in:doctorIds}}).select('-password');
    res.status(200).json({
      success: true,
      message: 'Getting appointments',
      data: doctors
    });
  } catch (error) {
    console.error("getMyAppointment error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};