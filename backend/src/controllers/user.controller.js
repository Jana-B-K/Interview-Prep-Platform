import * as userService from '../services/user.service.js';

export const getUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await userService.getUser(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const data = req.body;
        const user = await userService.updateUser(id, data);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
