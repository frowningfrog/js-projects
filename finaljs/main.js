import { getClasses, getMonsters } from "./api.js";

async function fetchData() {
  const result = await getClasses();
  return result;
}

async function fetchM() {
  const result = await getMonsters();
  return result;
}

export function roll(num) {
  return Math.floor(Math.random() * num);
}

export const answered = [];

export const amountOfQuestions = 10;

let pickQuiz;

const selectClass = document.getElementById('class');
const selectMonster = document.getElementById('monster');

if(selectMonster) {
  selectMonster.addEventListener('click', async () => {
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

const sbtn = document.getElementById('start-btn');

if(sbtn) {
  sbtn.addEventListener('click', () => {
    if(pickQuiz) {
      localStorage.setItem('quizType', pickQuiz);
      location.href = 'quiz.html';
    }
  });
}

export const classes = await fetchData();
export const monsters = await fetchM();