import taskRepository from '../../data/repositories/taskRepository';

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
