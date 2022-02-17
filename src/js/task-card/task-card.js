import { create } from '../utils/utils';

export default class TaskCard {
  constructor(taskData, taskManager) {
    this.manager = taskManager;
    this.container = create('div', 'task-card');
    // Task text
    this.text = create('div', 'task-card-text', taskData.text);
    this.text.addEventListener('blur', () => {
      this.manager.saveState();
      this.text.innerText = this.text.innerText.trim();
    });
    // Task remove button
    this.removeButton = create('button', 'task-remove-button');
    this.removeButton.innerHTML = '&#10006';
    this.removeButton.addEventListener('click', () => {
      this.removeTask();
    });
    // Task edit button
    this.editButton = create('button', 'task-edit-button');
    this.editButton.innerHTML = '&#9998';
    this.editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.editTask();
    });
    // Assembly
    this.container.append(this.text, this.removeButton, this.editButton);
  }

  bindToDoom(parent) {
    parent.appendChild(this.container);
  }

  editTask() {
    const text = this.container.querySelector('.task-card-text');
    text.contentEditable = 'true';
    text.focus();
    // text.innerText = 'Edited';
  }

  removeTask() {
    this.container.remove();
    this.manager.saveState();
  }
}
