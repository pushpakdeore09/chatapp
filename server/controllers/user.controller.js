import userSchema from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const registerController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser(req);
    const token = user.generateJwt(); 

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    const isPasswordMatch = await user.isValidPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = await user.generateJwt();
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    user: req.user,
  });
};

export const resetPasswordController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "User not found" });
    }
    const otp = userService.generateOtp();
    await userService.sendResetPasswordEmail(email, otp);
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();
    const isEmailSent = await userService.sendResetPasswordEmail(email, otp);
    if (!isEmailSent) {
      return res.status(500).json({ errors: "Failed to send email" });
    }
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const verifyOtpController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, otp } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "User not found" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ errors: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ errors: "OTP expired" });
    }
    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updatePasswordController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "User not found" });
    }
    const hashedPassword = await userService.hashPassword(password);
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpireAt = null;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export const logoutController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    redisClient.set(token, 'logout', 'EX', 60 * 60 * 24); 
    res.status(200).send("Logout successful");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
    
  }
}