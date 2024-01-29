# Task Manager App by React and Redux

This is a task list management web application developed with React, React Bootstrap, Redux and React Datepicker.

[Live Demo](https://vasyl-pavlenko.github.io/tt-wtg/)  

## Project Description.
This project is designed to create and manage a task list. Users can add, edit, delete, and mark tasks as completed

## Technical requirements
- **Frontend**:
We use React and React Bootstrap libraries to create the user interface.
We use Redux to manage the state of the application.

- **Home page**
Display the list of tasks.
For each task, display the name, description, and status (completed or not completed).
Adding the Add task button, which opens a modal window for creating a new task.
Modal window for creating/editing a task
Ability to add new tasks with a name, description, and status.
Ability to edit existing tasks.
Validation of fields (name, description or date cannot be empty).

- **Tasks functionality**
Ability to mark tasks as completed or unmark them.
Ability to edit the task.
Ability to delete tasks.
Filtering tasks by status (completed/not completed).

- **Saving data**
To save tasks, we use the local Redux state.
Also we save data to Local Storage in browser

## Getting Started
To run the Users App locally on your machine, follow these steps:

1. Clone the GitHub repository:
 
```sh
git clone https://github.com/Vasyl-Pavlenko/tt-wtg.git
cd tt-wtg
```

2. Install dependencies:
```sh
npm install
# or
yarn install
```
3. Run the application:
```sh
npm start
# or
yarn start
```
The application should now be running locally at http://localhost:3000.

## Additional information.
This project was created using the following technologies and libraries:

React
React Bootstrap
Redux Toolkit
Uuid
React Datepicker

## Author
The author of this project is:  **Vasyl Pavlenko**

### Happy coding!
