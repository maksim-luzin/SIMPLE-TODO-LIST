import callWebApi from 'src/helpers/webApiHelper';

export const addTask = async request => {
  const response = await callWebApi({
    endpoint: '/api/tasks',
    type: 'POST',
    request
  });
  return response.json();
};
