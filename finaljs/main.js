import { getClasses } from "./api.js";
import { cquestions } from "./questions.js";

async function fetchData() {
  const result = await getClasses();
  return result;
}

function roll(num) {
  return Math.floor(Math.random() * num);
}

const classes = await fetchData();

const questionList = cquestions;

const answered = [];

console.log(classes[0].classInfo.name);

for(let i=0; i<10; i++) {
  let getClass = classes[roll(classes.length)];
  let q = roll(questionList.length);

  if(answered.some(e => e[0].class === getClass.classInfo.name && e[0].question === questionList[q].question(getClass.classInfo))) {
    i--;
    continue;
  }

  console.log(questionList[q].question(getClass.classInfo));

  console.log(questionList[q].answer(getClass.classInfo, roll(getClass.classInfo.subclasses.length)));

  answered.push([{
    class: getClass.classInfo.name,
    question: questionList[q].question(getClass.classInfo)
  }]);
};