import { create } from '../utils/utils';
import TaskCard from '../task-card/task-card';

const newTaskData = {
  text: 'Enter text here...',
};

export default class Column {
  constructor(name, taskManager) {
    this.manager = taskManager; // Passing to make saving possible
    this.container = create('div', 'column');
    // Create header
    this.header = create('div', 'column-header', name);
    this.taskContainer = create('div', 'column-task-container');
    // Create footer and Add Task button
    this.footer = create('div', 'column-footer');
    const addTask = create('a', 'column-add-link', '+ Add Task');
    this.footer.appendChild(addTask);
    addTask.addEventListener('click', (e) => {
      e.stopPropagation();
      const newCard = this.addNewTask(newTaskData);
      newCard.editButton.click(); // Start edit just after creation;
    });
    // Assemble the component
    this.container.append(this.header, this.taskContainer, this.footer);
  }

  bindToDoom(parent) {
    parent.appendChild(this.container);
  }

  // Creates, adds and returns new task object
  addNewTask(taskData) {
    const newTask = new TaskCard(taskData, this.manager);
    newTask.bindToDoom(this.taskContainer);
    return newTask;
  }
}
