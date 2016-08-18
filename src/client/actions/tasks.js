import { fetchJSON } from '../helpers';
import _ from 'lodash';

/*
 * action types
 */

export const ADDING_TASK = 'ADDING_TASK';
export const ADD_TASK = 'ADD_TASK';
export const TASK_ADDED = 'TASK_ADDED';
export const REMOVING_TASK = 'REMOVING_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TASK_REMOVED = 'TASK_REMOVED';
export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';

/*
 * action creators
 */

export const addingTask = () => ({
  type: ADDING_TASK,
});

export const taskAdded = (task) => ({
  type: TASK_ADDED,
  task,
});

export const addTask = (listId, text, socket) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task: {
        description: text,
        listId,
      },
    }),
  };
  return (dispatch) => {
    dispatch(addingTask());
    //http://rp4.redpelicans.com:13004/api/todo/tasks
    fetchJSON('http://127.0.0.1:3000/todo/tasks', options)
      .then(resTask => {
        dispatch(taskAdded(resTask));
        socket.emit('new');
      });
  };
};

export const removingTask = () => ({
  type: REMOVING_TASK,
});

export const taskRemoved = (id) => ({
  type: TASK_REMOVED,
  id,
});

export const removeTask = (id) => {
  const options = {
    method: 'DELETE',
  };
  return (dispatch) => {
    dispatch(removingTask());
    //http://rp4.redpelicans.com:13004/api/todo/task/${id}
    fetchJSON(`http://127.0.0.1:3000/todo/task/${id}`, options)
      .then(response => dispatch(taskRemoved(response.id)));
  };
};

export const requestTasks = () => ({
  type: REQUEST_TASKS,
});

export const receiveTasks = (json) => ({
  type: RECEIVE_TASKS,
  tasks: _.keyBy(json, o => o.id),
});

export const fetchTasks = () => (
  (dispatch) => {
    dispatch(requestTasks());
    //http://rp4.redpelicans.com:13004/api/todo/tasks
    fetchJSON('http://127.0.0.1:3000/todo/tasks')
      .then(resTasks => dispatch(receiveTasks(resTasks)));
  }
);
