import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    const accessToken = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '1d'}
    );
    return accessToken;
};
