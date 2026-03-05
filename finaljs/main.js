import { getClasses } from "./api.js";
import { cquestions } from "./questions.js";

async function fetchData() {
  const result = await getClasses();
  return result;
}

function roll(num) {
  return Math.floor(Math.random() * num);
}

const pickQuiz = null;

const selectClass = document.getElementById('class');
const selectMonster = document.getElementById('monster');

selectMonster.addEventListener('click', () => {
  selectClass.style.border = 'none';
  selectClass.classList.remove('highlight');
  selectMonster.style.border = '2px solid black';
  selectMonster.classList.add('highlight');
  pickQuiz = 'monster';
});

selectClass.addEventListener('click', async () => {
  selectClass.style.border = '2px solid black';
  selectClass.classList.add('highlight');
  selectMonster.style.border = 'none';
  selectMonster.classList.remove('highlight');
  pickQuiz = 'class';
});

const classes = await fetchData();

const questionList = cquestions;

const answered = [];

for(let i=0; i<10; i++) {
  let getClass = classes[roll(classes.length)];
  let q = roll(questionList.length);

  if(answered.some(e => e[0].class === getClass.classInfo.name && e[0].question === questionList[q].question(getClass))) {
    i--;
    continue;
  }

  console.log(questionList[q].question(getClass));

  let lev = roll(getClass.levels.length);
  let fea = roll(getClass.levels[lev].features.length);

  while(getClass.levels[lev].features.length === 0 || getClass.levels[lev].features[fea].name === 'Ability Score Improvement') {
    lev = roll(getClass.levels.length);
    fea = roll(getClass.levels[lev].features.length);
  }

  console.log(questionList[q].answer(getClass, roll(getClass.classInfo.subclasses.length), lev, fea));

  answered.push([{
    class: getClass.classInfo.name,
    question: questionList[q].question(getClass)
  }]);
};