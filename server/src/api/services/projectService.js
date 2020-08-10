import userRepository from '../../data/repositories/userRepository';
import projectRepository from '../../data/repositories/projectRepository';

export const getAllProjectsByUserId = async userId => {
  const AllProjects = await userRepository.getAllProjectsByUserId(userId);

  if (!AllProjects.toJSON()) throw Error('Get all projects failed');
  return AllProjects;
};

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
};

export const deleteProject = async id => {
  const success = await projectRepository.deleteById(id);
  if (!success) throw Error('Project delete failed');
};
