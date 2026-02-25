import User from "../models/user.model.js";

export const getUser = async (id) => {
    const user = await User.findById(id);
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
}

export const updateUser = async (id, data) => {
    const updatedUser = await User.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true,
    });
    const userObj = updatedUser.toObject();
    delete userObj.password;
    return userObj;
}