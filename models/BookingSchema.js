import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctorID: {
      // type: mongoose.Types.ObjectId,
      // ref: "Doctor",
      // required: true,
      type: String
    },
    userID: {
      type: String,
      required: true,
    },
    // ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    // isPaid: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);