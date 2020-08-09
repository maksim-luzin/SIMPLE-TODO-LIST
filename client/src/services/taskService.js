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
  await callWebApi({
    endpoint: `/api/tasks/${request.id}`,
    type: 'PUT',
    request
  });
};

export const deleteTask = async request => {
  await callWebApi({
    endpoint: `/api/tasks/${request.id}`,
    type: 'DELETE',
    request
  });
};

export const moveTask = async request => {
  await callWebApi({
    endpoint: '/api/tasks/move',
    type: 'PUT',
    request
  });
};
