import { Router } from 'express';
import * as projectService from '../services/projectService';

const router = Router();

router
  .post('/', (req, res, next) => projectService.addProject(req.user.id, req.body)
    .then(id => res.send(id))
    .catch(next))

export default router;
