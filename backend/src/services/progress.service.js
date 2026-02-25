import Progress from '../models/progress.model.js';
import mongoose from 'mongoose';

export const addProgress = async (data) => {
    const newProgress = await Progress.create(data);
    return Progress.findById(newProgress._id)
        .populate('userId', 'name email role')
        .populate('questionId');
};

export const updateProgress = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid progress id');
        err.statusCode = 400;
        throw err;
    }

    const updatedProgress = await Progress.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    )
        .populate('userId', 'name email role')
        .populate('questionId');

    if (!updatedProgress) {
        const err = new Error('Progress not found');
        err.statusCode = 404;
        throw err;
    }

    return updatedProgress;
};

export const getUserProgress = async (userId) => {
    return Progress.find({ userId })
        .sort({ createdAt: -1 })
        .populate('userId', 'name email role')
        .populate('questionId');
};

export const getProgressById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid progress id');
        err.statusCode = 400;
        throw err;
    }

    const progress = await Progress.findById(id)
        .populate('userId', 'name email role')
        .populate('questionId');

    if (!progress) {
        const err = new Error('Progress not found');
        err.statusCode = 404;
        throw err;
    }

    return progress;
};
