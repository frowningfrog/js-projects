import { getClasses } from "./api.js";

async function fetchData() {
  const result = await getClasses();
  return result;
}

export const classes = await fetchData();

export function roll(num) {
  return Math.floor(Math.random() * num);
}

let pickQuiz = '';

const selectClass = document.getElementById('class');
const selectMonster = document.getElementById('monster');

if(selectMonster) {
  selectMonster.addEventListener('click', () => {
    selectClass.style.border = 'none';
    selectClass.classList.remove('highlight');
    selectMonster.style.border = '2px solid black';
    selectMonster.classList.add('highlight');
    pickQuiz = 'monster';
  });
}

if(selectClass) {
  selectClass.addEventListener('click', async () => {
    selectClass.style.border = '2px solid black';
    selectClass.classList.add('highlight');
    selectMonster.style.border = 'none';
    selectMonster.classList.remove('highlight');
    pickQuiz = 'class';
  });
}