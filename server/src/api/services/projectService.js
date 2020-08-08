import userRepository from '../../data/repositories/userRepository';

export const addProject = async (userId, project) => {
  const newProject = await projectRepository.create({
    name: project.name,
    userId
  });
  if (!newProject && !newProject.id) throw Error('Project add failed');
  return { id: newProject.id };
};

