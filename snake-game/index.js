const board = document.createElement('div');
board.classList.add('board');

let isLose = false;
let timeoutInit = null;
let timeout = null;
let direction = 'right';
let prevDirection = 'left';
let count = 9;
let positions = [];
let grid = 20;
let size = `${400 / grid}px`;
let speed = 1000;

for (let y = 0; y < grid; y++) {
  const row = document.createElement('div');
  row.classList.add('row');
  row.style.height = size;

  for (let x = 0; x < grid; x++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.height = size;
    box.style.width = size;
    box.id = `pos-${x}-${y}`;
    if (
      y === 9 && x === 9 ||
      y === 9 && x === 8 ||
      y === 9 && x === 6 ||
      y === 9 && x === 5 ||
      y === 9 && x === 4 ||
      y === 9 && x === 3 ||
      y === 9 && x === 2 ||
      y === 9 && x === 1 ||
      y === 9 && x === 0 ||
      y === 9 && x === 7
    ) {
      box.classList.add('snake');
      box.dataset.order = count;

      positions[count] = [x, y];

      count--;
    } else {
      box.dataset.order = -1;
    }

    row.append(box);
  }
  
  board.append(row);
}

document.body.append(board);


// redirect
document.addEventListener('keydown', (event) => {
  const up = event.code === 'ArrowUp';
  const down = event.code === 'ArrowDown';
  const left = event.code === 'ArrowLeft';
  const right = event.code === 'ArrowRight';

  if (up || down || left || right) {
    // const isSameDir = prevDirection === direction;

    prevDirection = direction;
    direction = event.code.replace('Arrow', '').toLowerCase();

    const isStepBack = (
      direction === 'left' && prevDirection === 'right' ||
      direction === 'right' && prevDirection === 'left' ||
      direction === 'up' && prevDirection === 'down' ||
      direction === 'down' && prevDirection === 'up'
    );

    if (!isStepBack) {
      clearTimeout(timeout);
      timeout = null;

      if (!isLose) move(up, down, left, right);

      clearTimeout(timeoutInit);
      timeoutInit = setTimeout(run, speed);
    }

    // if (isSameDir) return;
    // if (isStepBack) {
    //   // clearTimeout(timeoutInit);
    //   // timeoutInit = setTimeout(run, speed);

    //   return;
    // };
  
  }
});

function run () {
  if (isLose) {
    clearTimeout(timeout);
    clearTimeout(timeoutInit);

    timeout = null;
    timeoutInit = null;

    return;
  }

  const up = direction === 'up';
  const down = direction === 'down';
  const left = direction === 'left';
  const right = direction === 'right';

  move(up, down, left, right);

  timeout = setTimeout(run, speed);
}

function move (up, down, left, right) {
  let snakes = document.getElementsByClassName('snake');

  for (let i = 0; i < positions.length; i++) {
    const snkIdx = Array.from(snakes).findIndex(s => s.dataset.order == i);

    const snake = snakes[snkIdx];
    const order = +snake.dataset.order;

    let [x, y] = positions[i];

    if (i === 0) {
      const isStepBack = (
        direction === 'left' && prevDirection === 'right' ||
        direction === 'right' && prevDirection === 'left' ||
        direction === 'up' && prevDirection === 'down' ||
        direction === 'down' && prevDirection === 'up'
      );

      
      if (isStepBack) {
        if (up) y++;
        else if (down) y--;
        else if (left) x++;
        else if (right) x--;
      } else {
        if (up) y--;
        else if (down) y++;
        else if (left) x--;
        else if (right) x++;
      }

      console.log(x, y);

      const crashIdx = positions.findIndex(p => p[0] == x && p[1] == y);
      const isCrash = crashIdx > -1;
      const isBack = crashIdx === 1;

      if ((y > grid - 1 || x > grid - 1 || y < 0 || x < 0 || isCrash) && !isBack) {
        console.log('KALAH!');
        isLose = true;
        return;
      }

      // if (isStepBack) {
        positions.unshift([x, y]);
        positions.pop();
      // }
    }

    snake.classList.remove('snake');
    snake.dataset.order = order + 1;

    const newSnake = document.getElementById(`pos-${x}-${y}`);
    newSnake.classList.add('snake');
    newSnake.dataset.order = order;
  }
}