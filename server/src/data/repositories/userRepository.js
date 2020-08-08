import { UserModel, ProjectModel, TaskModel } from '../models/index';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getByUsername(username) {
    return this.model.findOne({ where: { username } });
  }

  getUserById(id) {
    return this.model.findOne({
      attributes: ['id', 'username'],
      where: { id }
    });
  }

  getAllProjectsByUserId(id) {
    return this.model.findOne({
      where: { id },
      attributes: [],
      order: [[ProjectModel, TaskModel, 'indexTask', 'ASC']],
      include: {
        model: ProjectModel,
        attributes: ['id', 'name'],
        include: {
          model: TaskModel,
          attributes: ['id', 'done', 'description', 'indexTask']
        }
      }
    });
  }
}

export default new UserRepository(UserModel);
