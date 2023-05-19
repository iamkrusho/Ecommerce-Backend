import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const generateToken = (user) => {
    return jwt.sign({ user: { ...user, password: undefined } }, "ClaveTest", { expiresIn: '30s' });
}
