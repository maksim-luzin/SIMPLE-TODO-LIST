import { Router } from 'express';
import * as projectService from '../services/projectService';

const router = Router();

router
  .post('/', (req, res, next) => projectService.addProject(req.user.id, req.body)
    .then(id => res.send(id))
    .catch(next))
  .put('/:id', (req, res, next) => projectService.updateProjectName(req.params.id, req.body)
    .then(project => res.send(project))
    .catch(next))
  .delete('/:id', (req, res, next) => projectService.deleteProject(req.params.id)
    .then(success => res.send(success))
    .catch(next));

export default router;
