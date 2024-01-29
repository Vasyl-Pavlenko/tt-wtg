import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Form, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskModal = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [taskDate, setTaskDate] = useState(null);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setError('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (name.trim() === '' || description.trim() === '' || !taskDate) {
      setError('Please fill in all the required fields');
      
      return;
    }

    const newTask = {
      id: uuidv4(),
      name,
      description,
      completed,
      taskDate,
    };

    dispatch(addTask(newTask));

    setName('');
    setDescription('');
    setCompleted(false);
    setTaskDate(null);
    handleClose();
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    if (field === 'name') {
      setName(value);
    } else if (field === 'description') {
      setDescription(value);
    }
    setError('');
  };


  return (
    <Container className="d-flex justify-content-center">
      <Button variant="primary" onClick={handleShow} className="mb-4">
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text-muted">Name</Form.Label>

              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label className="text-muted">Description</Form.Label>

              <Form.Control
                name="description"
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => handleInputChange(e, 'description')}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                name="completed"
                className="mb-2"
                type="checkbox"
                label="Completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDate">
              <Form.Label className="text-muted me-2">Task Date</Form.Label>

              <DatePicker
                selected={taskDate}
                onChange={(date) => setTaskDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {error ? (
          <Alert variant="warning">{error}</Alert>
        ) : (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" onClick={handleSubmit}>
              Save Task
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Container>
  );
};

export default TaskModal;
