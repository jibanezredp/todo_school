import React from 'react';

class AddTaskList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  handleUserInput = (e) => {
    e.preventDefault();
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddList(this.state.input, this.props.socket);
    this.setState({
      input: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className='add-tasklist'
          onChange={this.handleUserInput}
          placeholder='New Task list..'
          type='text'
          value={this.state.input} />
      </form>
    );
  }
}

AddTaskList.propTypes = {
  onAddList: React.PropTypes.func.isRequired,
  socket: React.PropTypes.object.isRequired,
};

export default AddTaskList;
