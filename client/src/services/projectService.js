import callWebApi from 'src/helpers/webApiHelper';

export const addProject = async request => {
  const response = await callWebApi({
    endpoint: '/api/projects',
    type: 'POST',
    request
  });
  return response.json();
};
