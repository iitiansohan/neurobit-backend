import Doctor from "../models/DoctorSchema.js";
import doc from "../assets/doctor.js";
import Booking from "../models/BookingSchema.js";

// ✅ Update Doctor
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully updated", data: updatedDoctor });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update", error: err.message });
  }
};

// ✅ Delete Doctor
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete", error: err.message });
  }
};

// ✅ Get Single Doctor
export const getDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).select("-password");

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({ success: true, message: "Successfully fetched doctor", data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch doctor", error: err.message });
  }
};

// ✅ Get All Doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");

    res.status(200).json({ success: true, message: "Successfully fetched doctors", data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch doctors", error: err.message });
  }
};

// ✅ Get Doctor Profile (Authenticated)
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const { password, ...doctorWithoutPassword } = doctor._doc;

    const appointments = await Booking.find({ doctorID: doctorId });

    res.status(200).json({
      success: true,
      message: "Getting profile info",
      data: {
        ...doctorWithoutPassword,
        appointments
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

