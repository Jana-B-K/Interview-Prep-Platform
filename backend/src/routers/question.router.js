import { Router } from 'express';
import * as questionController from '../controllers/question.controller.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const questionRouter = Router();

questionRouter.post('/', authorizeRole('admin'), questionController.addQuestion);
questionRouter.put('/:id', authorizeRole('admin'), questionController.updateQuestion);
questionRouter.get('/', authorizeRole('admin', 'user'), questionController.filterQuestion);
questionRouter.delete('/:id', authorizeRole('admin'), questionController.deleteQuestion);

export default questionRouter;
