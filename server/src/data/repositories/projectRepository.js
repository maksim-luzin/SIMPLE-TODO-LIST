import { ProjectModel, TaskModel } from '../models/index';
import BaseRepository from './baseRepository';

class ProjectRepository extends BaseRepository {
}

export default new ProjectRepository(ProjectModel);
