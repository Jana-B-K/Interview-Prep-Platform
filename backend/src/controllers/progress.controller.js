import * as progressService from '../services/progress.service.js';

export const addProgress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { questionId, status, userNotes } = req.body ?? {};
        const newProgress = await progressService.addProgress({ userId, questionId, status, userNotes });
        res.status(201).json(newProgress);
    } catch (err) {
        next(err);
    }
};

export const updateProgress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateProgress = await progressService.updateProgress(id, data);
        res.status(200).json(updateProgress);
    } catch (err) {
        next(err);
    }
};

export const getMyProgress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const progress = await progressService.getUserProgress(userId);
        res.status(200).json(progress);
    } catch (err) {
        next(err);
    }
};

export const getProgressById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const progress = await progressService.getProgressById(id);
        res.status(200).json(progress);
    } catch (err) {
        next(err);
    }
};
