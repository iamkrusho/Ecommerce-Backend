import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

export const generateAccessToken = (user) => {
    return jwt.sign({ user: { ...user, password: undefined } }, process.env.JWT_ACCESS_KEY, { expiresIn: '24h' });
}

export const generateResetToken = (user) => {
    return jwt.sign({ user: { id: user.id } }, process.env.JWT_RESET_KEY, { expiresIn: '10m' });
}

export const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY
    }
});
