import callWebApi from 'src/helpers/webApiHelper';

export const getAllProjects = async () => {
  const response = await callWebApi({
    endpoint: '/api/projects',
    type: 'GET'
  });
  return response.json();
};

export const addProject = async request => {
  const response = await callWebApi({
    endpoint: '/api/projects',
    type: 'POST',
    request
  });
  return response.json();
};

export const updateProjectName = async updateNameProject => {
  const request = {
    name: updateNameProject.name
  };
  await callWebApi({
    endpoint: `/api/projects/${updateNameProject.id}`,
    type: 'PUT',
    request
  });
};

export const deleteProject = async request => {
  await callWebApi({
    endpoint: `/api/projects/${request.id}`,
    type: 'DELETE'
  });
};
