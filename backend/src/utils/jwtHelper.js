import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    if (!process.env.JWT_ACCESS_SECRET) {
        const err = new Error('JWT_ACCESS_SECRET is not set');
        err.statusCode = 500;
        throw err;
    }

    const accessToken = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '1d'}
    );
    return accessToken;
};
