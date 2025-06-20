import express from "express";
import { updateUser, deleteUser, getUser, getUsers, getUserProfile, getMyAppointment } from "../controllers/userController.js";
import { authenticate, restrict } from "../auth/authorization.js";


const router = express.Router()

router.get('/:id', authenticate, getUser);
router.get('/', authenticate, getUsers);
router.put('/:id', authenticate,updateUser);
router.delete('/:id', authenticate, deleteUser);
router.get("/profile/me", authenticate, getUserProfile);
router.get("/appointments/my-appointments", authenticate, getMyAppointment);


export default router;