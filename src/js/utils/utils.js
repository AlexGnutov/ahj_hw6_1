export function create(tag, className, text = undefined) {
  const newElement = document.createElement(tag);
  newElement.className = className;
  if (text) {
    newElement.innerText = text;
  }
  return newElement;
}

export function randomCoords(xLimit, yLimit) {
  const ranX = Math.floor(Math.random() * (xLimit));
  const ranY = Math.floor(Math.random() * (yLimit));
  return [ranX, ranY];
}

export function randomCoordsProvider(xLimit, yLimit) {
  let oldX = 0;
  let oldY = 0;
  let newCoords;
  // **
  return () => {
    do {
      newCoords = randomCoords(xLimit, yLimit);
    } while (newCoords[0] === oldX && newCoords[1] === oldY);
    [oldX, oldY] = newCoords;
    return newCoords;
  };
}
