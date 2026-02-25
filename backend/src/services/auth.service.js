import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hashHelper.js";

export const login = async (email, password) => {
    if (typeof email !== "string" || typeof password !== "string") {
        const err = new Error("Email and password are required");
        err.statusCode = 400;
        throw err;
    }

    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
    }

    const isPasswordMatched = comparePassword(password, user.password);
    if (!isPasswordMatched) {
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
    }

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

export const register = async (data) => {
    try {
        if (!data || typeof data !== "object") {
            const err = new Error("Request body is required");
            err.statusCode = 400;
            throw err;
        }

        const { password, ...rest } = data;
        const hashedPassword = hashPassword(password);
        const payload = { ...rest, password: hashedPassword };

        const newUser = await User.create(payload);
        const userObj = newUser.toObject();
        delete userObj.password;
        return userObj;
    } catch (err) {
        if (err.code === 11000) {
            throw new Error("Email already registered");
        }
        throw err;
    }
};
