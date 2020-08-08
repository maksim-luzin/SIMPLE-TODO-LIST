import taskRepository from '../../data/repositories/taskRepository';
import projectRepository from '../../data/repositories/projectRepository';

export const addTask = async task => {
  const newTask = await taskRepository.create({
    ...task,
    done: false
  });
  if (!newTask && !newTask.id) throw Error('Project add failed');
  return { id: newTask.id };
};

export const updateTask = async (id, task) => {
  const updatedTask = await taskRepository.updateById(id, task);
  if (!updatedTask.toJSON()) throw Error('Task update failed');
  return;
};

export const deleteTask = async taskDelete => {
  const success = await taskRepository.deleteById(taskDelete.id);
  if (!success) throw Error('Task delete failed');
  let tasks = await projectRepository.getProjectById(taskDelete.projectId);

  tasks = tasks.toJSON().tasks.map(task => {
    if (taskDelete.indexTask > task.indexTask) return null;
    return {
      id: task.id,
      indexTask: task.indexTask - 1
    };
  }).filter(task => task);

  await tasks.forEach(async task => {
    await taskRepository.updateById(task.id, { indexTask: task.indexTask });
  });

  return;
};
