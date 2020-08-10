import { Router } from 'express';
import * as taskService from '../services/taskService';

const router = Router();

router
  .post('/', (req, res, next) => taskService.addTask(req.body)
    .then(id => res.send(id))
    .catch(next))
  .put('/move', (req, res, next) => taskService.moveTask(req.body)
    .then(task => res.send(task))
    .catch(next))
  .put('/:id', (req, res, next) => taskService.updateTask(req.params.id, req.body)
    .then(task => res.send(task))
    .catch(next))
  .delete('/:id', (req, res, next) => taskService.deleteTask(req.body)
    .then(success => res.send(success))
    .catch(next));

export default router;
