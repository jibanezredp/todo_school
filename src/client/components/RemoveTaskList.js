import React from 'react';
import Button from './Button';

const RemoveTaskList = ({ id, onRemove }) => {

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <Button className='rm-task-list' onClick={handleRemove}>x</Button>
  );
};

RemoveTaskList.propTypes = {
  id: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default RemoveTaskList;
