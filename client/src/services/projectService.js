import callWebApi from 'src/helpers/webApiHelper';

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
  const response = await callWebApi({
    endpoint: `/api/projects/${updateNameProject.id}`,
    type: 'PUT',
    request
  });
  return response.json();
};

export const deleteProject = async request => {
  const response = await callWebApi({
    endpoint: `/api/projects/${request.id}`,
    type: 'DELETE'
  });
  return response.json();
};