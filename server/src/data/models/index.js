import orm from '../db/connection';
import associate from '../db/associations';

const User = orm.import('./user');
const Project = orm.import('./project');
const Task = orm.import('./task');

associate({
  User,
  Project,
  Task
});

export {
  User as UserModel,
  Project as ProjectModel,
  Task as TaskModel
};
