import { create } from '../utils/utils';
import StateStore from '../state-store/state-store';
import Column from '../column/column';
import DragDrop from '../drag-drop/drag-drop';

export default class TaskManager {
  constructor() {
    this.container = create('div', 'task-manager');
    this.stateService = StateStore;
    // Add and init drag and drop for task-cards
    this.dragAndDrop = new DragDrop(
      this,
      'column-task-container',
      'task-card',
      'dragged',
      'drag-inside',
    );
    this.dragAndDrop.initDrag();
    // Allows remove focus by click inside the container
    this.container.addEventListener('click', this.letBlur);
    this.init();
  }

  bindToDoom(parent) {
    parent.appendChild(this.container);
  }

  html() {
    return this.container;
  }

  init() {
    const state = this.stateService.stateLoad();
    if (state) {
      this.recoverFromState(state);
    } else {
      this.assembleEmpty();
    }
  }

  saveState() {
    const state = [];
    const columns = Array.from(
      this.container.querySelectorAll('.column'),
    );

    columns.forEach((column) => {
      const columnData = {
        name: column.querySelector('.column-header').innerText,
        tasks: [],
      };
      const taskCards = Array.from(column.querySelectorAll('.task-card'));
      taskCards.forEach((task) => {
        columnData.tasks.push({
          text: task.querySelector('.task-card-text').innerText,
        });
      });
      state.push(columnData);
    });
    this.stateService.stateSave(state);
  }

  recoverFromState(state) {
    state.forEach((columnState) => {
      const newColumn = new Column(columnState.name, this);
      columnState.tasks.forEach((taskData) => {
        newColumn.addNewTask(taskData);
      });
      newColumn.bindToDoom(this.container);
    });
    return 0;
  }

  assembleEmpty() {
    // Creates empty columns, when no data loaded
    const c1 = new Column('TODO', this);
    const c2 = new Column('IN PROGRESS', this);
    const c3 = new Column('DONE', this);
    c1.bindToDoom(this.container);
    c2.bindToDoom(this.container);
    c3.bindToDoom(this.container);
  }

  // eslint-disable-next-line class-methods-use-this
  letBlur() {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }
}
