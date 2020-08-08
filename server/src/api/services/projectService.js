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
