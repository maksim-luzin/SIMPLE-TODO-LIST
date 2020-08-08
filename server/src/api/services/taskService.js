import taskRepository from '../../data/repositories/taskRepository';

export const addTask = async task => {
  const newTask = await taskRepository.create({
    ...task,
    done: false
  });
  if (!newTask && !newTask.id) throw Error('Project add failed');
  return { id: newTask.id };
};
