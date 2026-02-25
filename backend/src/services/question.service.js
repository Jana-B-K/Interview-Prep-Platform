import Question from '../models/question.model.js';
import mongoose from 'mongoose';

export const addQuestion = async (data) => {
    const newQuestion = await Question.create(data);
    return newQuestion;
};

export const updateQuestion = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid question id');
        err.statusCode = 400;
        throw err;
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
        const err = new Error('Question not found');
        err.statusCode = 404;
        throw err;
    }

    return updatedQuestion;
};

export const filterQuestion = async (filters) => {
    const filteredQuestions = await Question.find(filters);
    return filteredQuestions;
};

export const deleteQuestion = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid question id');
        err.statusCode = 400;
        throw err;
    }

    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
        const err = new Error('Question not found');
        err.statusCode = 404;
        throw err;
    }

    return deletedQuestion;
};

export const addQestion = addQuestion;
