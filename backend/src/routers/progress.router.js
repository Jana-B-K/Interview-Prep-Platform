import { Router } from "express";
import * as progressController from '../controllers/progress.controller.js';

const progressRouter = Router();

progressRouter.get('/', progressController.getMyProgress);
progressRouter.get('/:id', progressController.getProgressById);
progressRouter.post('/', progressController.addProgress);
progressRouter.put('/:id', progressController.updateProgress);

export default progressRouter;
