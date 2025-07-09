import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js'; 

dotenv.config();
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      SECRET_KEY,
      { expiresIn: '1d' }
    );
  
    res.cookie("authcookie", token, {
      httpOnly: true, 
      secure: true,
      sameSite: "None", 
      maxAge: 86400000,
      path:"/",
    });
    res.status(201).json({
      message: 'User registered',
      user: { name: user.name, email: user.email },
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    
    res.cookie("authcookie", token, {
      httpOnly: true, 
      secure: true,
      sameSite: "None", 
      maxAge: 86400000,
      path:"/",
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: null });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    
    res.cookie("authcookie", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path:"/",
      maxAge: 86400000,
    });


    res.status(200).json({
      token: jwtToken,
      user: { name: user.name, email: user.email, hasPassword: !!user.password }
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};


export const setPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });


  if (user.password) return res.status(400).json({ message: "Password already set" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password set successfully" });
};


export const logOutUser = async (req , res) =>{
  res.clearCookie("authcookie" ,{
    httpOnly: true,
    sameSite: "None",
    secure: true, 
    path:"/",
  });
  res.status(200).json({ message: "Logged out successfully" });
}
