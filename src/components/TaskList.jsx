import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  toggleTask,
  deleteTask,
  selectAllTasks,
  deleteCompletedTasks,
  setFilter
} from '../redux/actions';
import DatePicker from 'react-datepicker';

import {
  Button,
  ListGroup,
  Modal,
  Form,
  Alert,
  Container,
  ButtonGroup,
  Row,
  Col
} from 'react-bootstrap';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const dispatch = useDispatch();

  const [editTask, setEditTask] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDate, setEditedDate] = useState(null);
  const [error, setError] = useState('');

  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleSelectAll = () => {
    dispatch(selectAllTasks());
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteCompletedTasks());
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setEditedName(task.name);
    setEditedDescription(task.description);
    setEditedDate(task.taskDate ? new Date(task.taskDate) : null);
  };

  const handleSaveEdit = () => {
    if (editedName.trim() === '' || editedDescription.trim() === '' || editedDate === null) {
      setError('Please fill in the fields "Task Name" and "Task Description"');
      return;
    }

    const updatedTask = {
      id: editTask.id,
      name: editedName,
      description: editedDescription,
      completed: editTask.completed,
      taskDate: editedDate,
    };

    dispatch(deleteTask(editTask.id));
    dispatch(addTask(updatedTask));

    setEditTask(null);
    setError('');
  };

  const handleInputChange = (e, field) => {
    if (field === 'editedName') {
      setEditedName(e.target.value);
    } else if (field === 'editedDescription') {
      setEditedDescription(e.target.value);
    }

    setError('');
  };

  const handleCancelEdit = () => {
    setEditTask(null);
    setError('');
  };

  const filteredTasks = tasks
    .slice()
    .sort((a, b) => a.id - b.id)
    .filter((task) => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'active') {
        return !task.completed;
      } else if (filter === 'completed') {
        return task.completed;
      }

      return (
        task.taskDate &&
        new Date(task.taskDate).toLocaleDateString() === selectedDate?.toLocaleDateString()
      );
    });

  useEffect(() => {
    const json = JSON.stringify(tasks);
      localStorage.setItem('tasks', json);
  }, [tasks]);
  

  return (
    <Container>
      <ListGroup>
        {filteredTasks.map((task) => (
          <ListGroup.Item key={task.id}>
            <Row className="d-flex align-items-center">
              <Col md={3} lg={3}>
                <label role="button">
                  <input
                    role="button"
                    name="completed"
                    type="checkbox"
                    label="Completed"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id, filter)}
                  />{' '}
                  Completed
                </label>
              </Col>

              <Col md={4}>
                <h5
                  className={
                    task.completed ? 'text-decoration-line-through fw-light text-success' : ''
                  }>
                  {task.name}
                </h5>

                <p className={task.completed ? 'text-decoration-line-through fw-light' : ''}>
                  {task.description}
                </p>
              </Col>

              <Col md={2}>
                <p className={task.completed ? 'text-decoration-line-through fw-light' : ''}>
                  {task.taskDate ? new Date(task.taskDate).toLocaleDateString() : ''}
                </p>
              </Col>

              <Col md={3}>
                <ButtonGroup size="md">
                  <Button variant="info" onClick={() => handleEdit(task)}>
                    Edit
                  </Button>

                  <Button variant="danger" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}

        {tasks.length > 0 && (
          <ButtonGroup
            size="sm"
            className="
              my-4
              w-30
              mx-auto
            ">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => dispatch(setFilter('all'))}>
              All
            </Button>

            <Button
              variant={filter === 'active' ? 'primary' : 'outline-primary'}
              onClick={() => dispatch(setFilter('active'))}>
              Active
            </Button>

            <Button
              variant={filter === 'completed' ? 'primary' : 'outline-primary'}
              onClick={() => dispatch(setFilter('completed'))}>
              Completed
            </Button>

            <Button variant="primary" onClick={handleSelectAll}>
              Check All
            </Button>
          </ButtonGroup>
        )}

        {tasks.some((task) => task.completed) && (
          <Button
            size="sm"
            className="w-30 mx-auto"
            variant="danger"
            onClick={handleDeleteCompleted}>
            Clear Completed
          </Button>
        )}
      </ListGroup>

      <Modal show={editTask} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text-muted">Name</Form.Label>

              <Form.Control
                name="name"
                type="text"
                placeholder="Edit Name"
                value={editedName}
                onChange={(e) => handleInputChange(e, 'editedName')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label className="text-muted">Description</Form.Label>

              <Form.Control
                name="description"
                type="text"
                placeholder="Edit Description"
                value={editedDescription}
                onChange={(e) => handleInputChange(e, 'editedDescription')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <DatePicker
                selected={editedDate}
                onChange={(date) => setEditedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                placeholderText="Select Date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {error ? (
          <Alert variant="warning">{error}</Alert>
        ) : (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>

            <Button variant="primary" onClick={handleSaveEdit}>
              Save
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Container>
  );
};

export default TaskList;
