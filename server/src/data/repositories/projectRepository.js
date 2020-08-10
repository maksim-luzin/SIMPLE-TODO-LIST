import { ProjectModel, TaskModel } from '../models/index';
import BaseRepository from './baseRepository';

class ProjectRepository extends BaseRepository {
  getProjectById(id) {
    return this.model.findOne({
      where: { id },
      attributes: [],
      order: [[TaskModel, 'indexTask', 'ASC']],
      include: {
        model: TaskModel,
        attributes: ['id', 'done', 'description', 'indexTask']
      }
    });
  }
}

export default new ProjectRepository(ProjectModel);
