export default class DragDrop {
  // container - main component element
  // draggableClass - Name of draggable CSS Class
  // dragStateClass - CSS class for component during drag
  constructor(
    manager,
    basketClass,
    draggableClass,
    dragStateClass,
    dragInside,
  ) {
    this.manager = manager;
    this.main = manager.container;
    this.draggableClass = draggableClass;
    this.dragStateClass = dragStateClass;
    this.dragInsideClass = dragInside;
    this.basketClass = basketClass;
    this.initDrag();
    this.dragElement = null; // Drag-related parameters...
    this.dragOffset = { x: 0, y: 0 };
    this.containerOffset = { x: 0, y: 0 };
  }

  initDrag() {
    this.main.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (
        !e.target.classList.contains(this.draggableClass)
        || (document.activeElement !== document.body
        && document.activeElement !== null)
      ) {
        return;
      }
      this.dragElement = e.target;
      this.getGhostInitialCoords(e, this.dragElement);
      this.dragElement.classList.add(this.dragStateClass);
      this.main.classList.add(this.dragInsideClass);
    });

    this.main.addEventListener('mousemove', (e) => {
      if (!this.dragElement) {
        return;
      }
      // Dragged absolute positioned element relatively to the main
      this.dragElement.style.left = `${e.pageX - this.dragOffset.x - this.containerOffset.x}px`;
      this.dragElement.style.top = `${e.pageY - this.dragOffset.y - this.containerOffset.y}px`;
    });

    this.main.addEventListener('mouseleave', () => {
      if (!this.dragElement) {
        return;
      }
      this.dragElement.style.top = 'auto';
      this.dragElement.style.left = 'auto';
      this.dragElement.classList.remove(this.dragStateClass);
      this.main.classList.remove(this.dragInsideClass);
      this.dragElement = null;
    });

    this.main.addEventListener('mouseup', (e) => {
      if (!this.dragElement) {
        return;
      }
      const closestUnderPointer = document.elementFromPoint(e.clientX, e.clientY);
      const targetCard = closestUnderPointer.closest(`.${this.draggableClass}`);
      if (closestUnderPointer.classList.contains(this.basketClass)) {
        closestUnderPointer.appendChild(this.dragElement);
      } else if (targetCard) {
        const closestRect = targetCard.getBoundingClientRect();
        const relPosInd = closestRect.top + closestRect.height / 2 - e.pageY;
        const parent = targetCard.parentNode;
        if (relPosInd >= 0) {
          parent.insertBefore(this.dragElement, targetCard);
        } else {
          parent.insertBefore(this.dragElement, targetCard.nextSibling);
        }
      }
      this.dragElement.style.top = 'auto';
      this.dragElement.style.left = 'auto';
      this.dragElement.classList.remove(this.dragStateClass);
      this.main.classList.remove(this.dragInsideClass);
      this.dragElement = null;
      this.manager.saveState();
    });
  }

  getGhostInitialCoords(e, dragElement) {
    const dragRect = dragElement.getBoundingClientRect();
    const containerRect = this.main.getBoundingClientRect();
    this.containerOffset.x = containerRect.left;
    this.containerOffset.y = containerRect.top;
    this.dragOffset.x = e.pageX - dragRect.left;
    this.dragOffset.y = e.pageY - dragRect.top;
  }
}
