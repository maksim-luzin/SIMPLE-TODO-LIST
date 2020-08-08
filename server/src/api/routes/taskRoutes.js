import { Router } from 'express';
import * as taskService from '../services/taskService';

const router = Router();

router
  .post('/', (req, res, next) => taskService.addTask(req.body)
    .then(id => res.send(id))
    .catch(next))

export default router;
