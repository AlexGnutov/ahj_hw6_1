import TaskManager from './task-manager/task-manager';

window.onload = () => {
  const container = document.getElementById('container');

  const taskManager = new TaskManager();
  taskManager.bindToDoom(container);
};
