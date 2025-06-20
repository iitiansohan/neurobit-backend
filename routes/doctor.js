import express from "express";
import { updateDoctor, deleteDoctor, getDoctor, getDoctors, getDoctorProfile } from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/authorization.js";

const router = express.Router()

router.get('/:id', getDoctor);
router.get('/', getDoctors);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);
router.get('/profile/me', authenticate,getDoctorProfile);

export default router;