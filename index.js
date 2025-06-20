import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import doctorRoute from './routes/doctor.js';
import appointmentRoute from './routes/appointment.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin: true
}

app.get('/', (req, res) => {
    res.send("WORKING")
})

main().catch(err => console.log(err));//catch block to resolve the error is connection to the database has failed

async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Database Connected");

}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); 

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/appointments', appointmentRoute);

app.listen(port, () => {
    console.log("Serving on port " + port);
})