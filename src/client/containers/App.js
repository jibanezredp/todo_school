import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getProps } from '../selectors';
import Title from '../components/Title';
import AddTaskList from '../components/AddTaskList';
import TaskLists from '../components/TaskLists';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import {
  addList,
  removeList,
  fetchLists,
} from '../actions/lists';
import {
  addTask,
  removeTask,
  fetchTasks,
} from '../actions/tasks';

const socket = io('localhost:3000');

class App extends React.Component {

  componentWillMount() {
    this.props.fetchAll();
    socket.on('new', () => {
      this.props.fetchAll();
    });
  }

  render() {
    return (
      <div className='todo-app'>
        <Title value='Todo App' />
        <AddTaskList {...this.props} socket={socket} />
        <div className='nav'>
          <Button className='refresh' onClick={this.props.fetchAll}>Refresh</Button>
          <Spinner {...this.props} />
        </div>
        <TaskLists {...this.props} socket={socket} />
      </div>
    );
  }
}

App.propTypes = {
  fetchAll: React.PropTypes.func.isRequired,
  lists: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchAll: () => {
    dispatch(fetchLists());
    dispatch(fetchTasks());
  },
  onAddList: (title, socket) => {
    dispatch(addList(title, socket));
  },
  onRemoveList: (id) => {
    dispatch(removeList(id));
  },
  onAddTask: (listId, text, socket) => {
    dispatch(addTask(listId, text, socket));
  },
  onRemoveTask: (id) => {
    dispatch(removeTask(id));
  },
});

export default connect(getProps, mapDispatchToProps)(App);
