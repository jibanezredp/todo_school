import { fetchJSON } from '../helpers';
import _ from 'lodash';

/*
 * action types
 */

export const ADDING_LIST = 'ADDING_LIST';
export const ADD_LIST = 'ADD_LIST';
export const LIST_ADDED = 'LIST_ADDED';
export const REMOVING_LIST = 'REMOVING_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const LIST_REMOVED = 'LIST_REMOVED';
export const REQUEST_LISTS = 'REQUEST_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';

/*
 * action creators
 */

export const addingList = () => ({
  type: ADDING_LIST,
});

export const listAdded = (list) => ({
  type: LIST_ADDED,
  list,
});

export const addList = (title, socket) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo: { label: title } }),
  };
  return (dispatch) => {
    dispatch(addingList());
    //http://rp4.redpelicans.com:13004/api/todo/lists
    fetchJSON('http://127.0.0.1:3000/todo/lists', options)
      .then(resList => {
        dispatch(listAdded(resList));
        socket.emit('new');
      });
  };
};

export const removingList = () => ({
  type: REMOVING_LIST,
});

export const listRemoved = (id) => ({
  type: LIST_REMOVED,
  id,
});

export const removeList = (id) => {
  const options = {
    method: 'DELETE',
  };
  return (dispatch) => {
    dispatch(removingList());
    //http://rp4.redpelicans.com:13004/api/todo/list/${id}
    fetchJSON(`http://127.0.0.1:3000/todo/list/${id}`, options)
      .then(response => dispatch(listRemoved(response.id)));
  };
};

export const requestLists = () => ({
  type: REQUEST_LISTS,
});

export const receiveLists = (json) => ({
  type: RECEIVE_LISTS,
  lists: _.keyBy(json, o => o.id),
});

export const fetchLists = () => (
  (dispatch) => {
    dispatch(requestLists());
    //http://rp4.redpelicans.com:13004/api/todo/lists
    fetchJSON('http://127.0.0.1:3000/todo/lists')
      .then(resLists => dispatch(receiveLists(resLists)));
  }
);
