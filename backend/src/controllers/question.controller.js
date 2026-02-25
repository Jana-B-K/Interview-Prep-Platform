import * as questionService from '../services/question.service.js';

export const addQuestion = async (req, res, next) => {
    try {
        const data = req.body;
        const newQuestion = await questionService.addQuestion(data);
        res.status(201).json(newQuestion);
    } catch (err) {
        next(err);
    }
};

export const updateQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedQuestion = await questionService.updateQuestion(id, data);
        res.status(200).json(updatedQuestion);
    } catch (err) {
        next(err);
    }
};

export const filterQuestion = async (req, res, next) => {
    try {
        const { category, difficulty } = req.query;
        let filters = {};
        if (category) filters.category = category;
        if (difficulty) filters.difficulty = difficulty;
        const filteredQuestion = await questionService.filterQuestion(filters);
        res.status(200).json(filteredQuestion);
    } catch (err) {
        next(err);
    }
};

export const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        await questionService.deleteQuestion(id);
        res.status(200).json({ message: 'Question deleted', success: true });
    } catch (err) {
        next(err);
    }
};

export const addQestion = addQuestion;
