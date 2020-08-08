import { TaskModel } from '../models/index';
import BaseRepository from './baseRepository';

class TaskRepository extends BaseRepository { }

export default new TaskRepository(TaskModel);
