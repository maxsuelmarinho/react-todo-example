import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ToDo from './Todo';

const TodoList = ({ toDoList }) => (
  <Jumbotron>
    <ListGroup>
      {toDoList.map((toDo, index) => (
        <ToDo key={index} {...toDo} />
      ))}
    </ListGroup>
  </Jumbotron>
);

TodoList.propTypes = {
  toDoList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default TodoList;
