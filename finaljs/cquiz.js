import { cquestions } from "./questions.js";
import { roll } from "./main.js";
import { classes } from "./main.js";

const questionList = cquestions;
const displayList = JSON.parse(localStorage.getItem('displayList')) || [];
const answered = [];

if(displayList.length === 0) {
  for(let i=0; i<10; i++) {
    let getClass = classes[roll(classes.length)];
    let q = roll(questionList.length);

    // skip if question has already been answered for this class
    if(answered.some(e => e[0].class === getClass.classInfo.name && e[0].question === questionList[q].question(getClass))) {
        i--;
        continue;
    }

    let lev = roll(getClass.levels.length);
    let fea = roll(getClass.levels[lev].features.length);

    // skip if no features at this level or if feature is ability score improvement
    while(getClass.levels[lev].features.length === 0 || getClass.levels[lev].features[fea].name === 'Ability Score Improvement') {
        lev = roll(getClass.levels.length);
        fea = roll(getClass.levels[lev].features.length);
    }

    displayList.push({
        q: questionList[q].question(getClass),
        a: questionList[q].answer(getClass, roll(getClass.classInfo.subclasses.length), lev, fea)
    });

    answered.push([{
        class: getClass.classInfo.name,
        question: questionList[q].question(getClass)
    }]);
  };
  localStorage.setItem('displayList', JSON.stringify(displayList));
}

console.log(displayList);

document.getElementById('displayQ').innerText = displayList[0].q;