import express from "express";
import { bookAppointment } from "../controllers/appointmentControllers.js";
import { authenticate, restrict } from "../auth/authorization.js";
const router = express.Router()

router.post('/book-appointment',authenticate, bookAppointment);

export default router;