import userRepository from '../../data/repositories/userRepository';

export const addProject = async (userId, project) => {
  const newProject = await projectRepository.create({
    name: project.name,
    userId
  });
  if (!newProject && !newProject.id) throw Error('Project add failed');
  return { id: newProject.id };
};

export const updateProjectName = async (id, projectName) => {
  const updateNameProject = await projectRepository.updateById(id, projectName);
  const { name } = updateNameProject.toJSON();

  if (!name && name === projectName.name) throw Error('Project update failed');
  return { update: true };
};

export const deleteProject = async id => {
  const success = await projectRepository.deleteById(id);
  if (!success) throw Error('Project delete failed');
  return { delete: true };
};
