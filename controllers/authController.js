import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// JWT token generator
const generateToken = user => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// SIGNUP Controller
export const signup = async (req, res) => {
  const { email, password, name, role, gender } = req.body;

  try {
    let existingUser = null;

    if (role === 'patient') {
      existingUser = await User.findOne({ email });
    } else {
      existingUser = await Doctor.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === 'patient') {
      await User.create({
        name,
        email,
        password: hashPassword,
        gender,
        role,
      });
    } else if (role === 'doctor') {
      await Doctor.create({
        name,
        email,
        password: hashPassword,
        gender,
        role,
      });
    }

    res
      .status(200)
      .json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
};


// LOGIN Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) user = patient;
    if (doctor) user = doctor;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(user&&await bcrypt.compare(password,user.password))
    {
        const token = generateToken(user);

        const { password: _, role, appointments, ...rest } = user._doc;

        res.status(200).json({
        status: true,
        message: 'Logged in successfully',
        token,
        data: { ...rest },
        role,
    });
    }
    else
    {
        return res
        .status(400)
        .json({ status: false, message: 'Invalid credentials' });
    }
  } 
  catch (err) {
    console.error('Login error:', err);
    res
      .status(500)
      .json({ status: false, message: 'Failed to login' });
  }
};
