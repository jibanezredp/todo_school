import React from 'react';
import _ from 'lodash';
import Task from './Task';
import AddTask from './AddTask';
import TaskListTitle from './TaskListTitle';
import RemoveTaskList from './RemoveTaskList';

class TaskList extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.tasks.data !== nextProps.tasks.data;
  }

  render() {
    const tasks = _.pickBy(this.props.tasks.data, task => task.listId === this.props.list.id);

    const taskElems = _.map(tasks, task => (
        <Task task={task} {...this.props} key={task.id} />
    ));

    return (
      <div className='task-list'>
        <header>
          <TaskListTitle value={this.props.list.label} />
          <RemoveTaskList id={this.props.list.id} onRemove={this.props.onRemoveList} />
        </header>
        <div className='tasks'>
          {taskElems}
        </div>
        <AddTask {...this.props} listId={this.props.list.id} onAddTask={this.props.onAddTask} />
      </div>
    );
  }
}

TaskList.propTypes = {
  list: React.PropTypes.object.isRequired,
  onAddTask: React.PropTypes.func.isRequired,
  onRemoveList: React.PropTypes.func.isRequired,
  tasks: React.PropTypes.object.isRequired,
};

export default TaskList;
