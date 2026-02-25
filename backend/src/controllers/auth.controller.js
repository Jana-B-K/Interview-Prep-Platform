import * as authService from '../services/auth.service.js';
import { generateAccessToken } from '../utils/jwtHelper.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body ?? {};
        const user = await authService.login(email, password);
        const accessToken = generateAccessToken(user);
        res.status(200).json({ accessToken, user });
    } catch (err) {
        next(err);
    }
};

export const register = async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await authService.register(data);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};
