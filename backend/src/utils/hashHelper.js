import bcrypt from 'bcrypt';
const saltRound = 10;

export const hashPassword = (password) => {
    if (typeof password !== 'string' || password.trim() === '') {
        const err = new Error('Password is required and must be a non-empty string');
        err.statusCode = 400;
        throw err;
    }

    return bcrypt.hashSync(password, saltRound);
};

export const comparePassword = (plainPassword, hashedPassword) => {
    if (typeof plainPassword !== 'string' || typeof hashedPassword !== 'string') {
        return false;
    }

    return bcrypt.compareSync(plainPassword, hashedPassword);
};
