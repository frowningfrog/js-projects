import { mquestions } from "./questions.js";
import { roll, monsters, amountOfQuestions, answered } from "./main.js";
import { renderQ, setupListeners, displayList } from "./quizengine.js";

const questionList = mquestions;

if(displayList.length === 0) {
  for(let i=0; i<amountOfQuestions; i++) {
    let getMonster = monsters[roll(monsters.length)];
    console.log('mon:', getMonster);
    let wrongMonList = monsters.filter(m => m.name !== getMonster.name);
    let q = roll(questionList.length);

    let wrongMon;
    let wrongMons = [];

    if(q === 0) {
        for(let wm = 0; wm < 3; wm++) {
            wrongMon = wrongMonList[roll(wrongMonList.length)];

            while(wrongMons.some(wmon => wmon.hit_points === wrongMon.hit_points)) {
                wrongMon = wrongMonList[roll(wrongMonList.length)];
            }

            wrongMons.push(wrongMon);
        }

        displayList.push({
            q: questionList[q].question(getMonster),
            a: [
                String(questionList[q].answer(getMonster)),
                String(wrongMons[0].hit_points),
                String(wrongMons[1].hit_points),
                String(wrongMons[2].hit_points)
            ]
        })
    }
  }
  console.log(displayList);
}

renderQ();

setupListeners();