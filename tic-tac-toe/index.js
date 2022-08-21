const boxes = document.querySelectorAll('.box');

let state = 'X';
let isWin = false;

const wins = [
  [0, 3, 6], // col-1
  [1, 4, 7], // col-2
  [2, 5, 8], // col-3
  [0, 1, 2], // row-1
  [3, 4, 5], // row-2
  [6, 7, 8], // row-3
  [0, 4, 8], // diagonal kiri ke kanan
  [2, 4, 6] // diagonal kanan ke kiri
]

for (let i = 0; i < boxes.length; i++) {
  const box = boxes[i];

  box.addEventListener('click', () => {
    if (box.innerHTML) return;
    if (isWin) return;

    box.innerHTML = state;

    const probs = wins.filter(win => win.includes(i));

    for (let j = 0; j < probs.length; j++) {
      const prob = probs[j];

      let counter = 0;

      for (let k = 0; k < prob.length; k++) {
        const probIdx = prob[k];

        const currState = boxes[probIdx].innerHTML;

        if (currState === state) {
          counter++;
        }
      }

      if (counter === 3) {
        alert(`${state} Pemenangnya!`);
        isWin = true;
        return;
      }
    } 

    if (state === 'X') state = 'O';
    else if (state === 'O') state = 'X';
  })
}