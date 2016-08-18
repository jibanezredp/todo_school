import React from 'react';
import Button from './Button';

const RemoveTask = ({ id, onRemove }) => {

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <Button className='rm-task' onClick={handleRemove}>x</Button>
  );
};

RemoveTask.propTypes = {
  id: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default RemoveTask;
