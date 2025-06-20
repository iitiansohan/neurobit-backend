import express from "express";
import { bookAppointment } from "../controllers/appointmentControllers.js";

const router = express.Router()

router.post('/book-appointment', bookAppointment);

export default router;