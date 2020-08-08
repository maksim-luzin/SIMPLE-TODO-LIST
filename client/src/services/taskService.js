import callWebApi from 'src/helpers/webApiHelper';

export const addTask = async request => {
  const response = await callWebApi({
    endpoint: '/api/tasks',
    type: 'POST',
    request
  });
  return response.json();
};

export const updateTask = async request => {
  const response = await callWebApi({
    endpoint: `/api/tasks/${request.id}`,
    type: 'PUT',
    request
  });
  return;
};

export const deleteTask = async request => {
  const response = await callWebApi({
    endpoint: `/api/tasks/${request.id}`,
    type: 'DELETE',
    request
  });
  return;
};