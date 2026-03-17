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

export function statListen() {
  const statbtn = document.querySelectorAll('.gotoStats');

  if(statbtn) {
    statbtn.forEach(btn => {
      btn.addEventListener('click', function() {
        location.href = 'stats.html';
      })
    })
  }
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

statListen();

export const classes = JSON.parse(localStorage.getItem('cData')) || await fetchData();
export const monsters = JSON.parse(localStorage.getItem('monsData')) || await fetchM();

if(!JSON.parse(localStorage.getItem('cData'))) {
  localStorage.setItem('cData', JSON.stringify(classes));
}

if(!JSON.parse(localStorage.getItem('monsData'))) {
  localStorage.setItem('monsData', JSON.stringify(monsters));
}