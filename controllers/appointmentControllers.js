import nodemailer from 'nodemailer';
import doc from "../assets/doctor.js";
import Booking from '../models/BookingSchema.js';

// @Desc: Handles appointment booking and sends an email notification
export const bookAppointment = async (req, res) => {
  const userId = req.userId;

  const { doctorId, appointmentTime } = req.body;

  try {
    //Find doctor from hardcoded list
    const selectedDoctor = doc.find((doctor) => doctor._id === doctorId);

    if (!selectedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    //Setting up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    //Email content
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: selectedDoctor.email,
      subject: 'New Appointment Booking',
      text: `Dear ${selectedDoctor.name},\n\nYou have a new appointment scheduled at ${appointmentTime}.\n\nRegards,\nNeurobit: Your Telemedicine Platform`,
    };

    await transporter.sendMail(mailOptions);

    await Booking.create({
      userID: userId,
      doctorID: doctorId,
      appointmentDate: appointmentTime,
    });

    res.status(200).json({ success: true, message: 'Appointment booked successfully.' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Error booking appointment.' });
  }
};
