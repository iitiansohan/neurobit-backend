import nodemailer from 'nodemailer'
import doc from '../../src/assets/doctors.js';
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';


//@Desc:-  Handles the booking of an appointment between a patient and a doctor, and sends an email notification to the doctor using Nodemailer
export const bookAppointment = async (req, res) => {
    const { userId, doctorId, appointmentTime } = req.body;

    try {
        // Find the selected doctor from the hardcoded list
        const selectedDoctor = doc.find((doctor) => doctor._id === doctorId);
        console.log(selectedDoctor.email)
        if (!selectedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found.' });
        }

        // Send email to the selected doctor
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'gmail'
            auth: {
                user: 'prakharsrvstv14@gmail.com',
                pass: 'tkwa qpqe kwcv excx',
            },
        });

        const mailOptions = {
            from: 'prakharsrvstv14@gmail.com',
            to: selectedDoctor.email,
            subject: 'New Appointment Booking',
            text: `Dear ${selectedDoctor.name},\n\nYou have a new appointment scheduled this ${appointmentTime}.\n\nRegards,\nMediCALL:Your Telemedicine Platform`,
        };

        await transporter.sendMail(mailOptions);
        const appointment = new Booking({
            userID:userId,
            doctorID:doctorId,
            appointmentDate:appointmentTime,
        });

        await appointment.save();

        res.status(200).json({ success: true, message: 'Appointment booked successfully.' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ success: false, message: 'Error booking appointment.' });
    }


};