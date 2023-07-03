import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

export const generateToken = (user) => {
    return jwt.sign({ user: { ...user, password: undefined } }, process.env.JWT_PRIVATE_KEY, { expiresIn: '5m' });
}

export const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY
    }
});
