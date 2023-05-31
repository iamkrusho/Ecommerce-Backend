import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
}

export const generateToken = (user) => {
    return jwt.sign({ user: { ...user, password: undefined } }, "ClaveTest", { expiresIn: '30s' });
}
