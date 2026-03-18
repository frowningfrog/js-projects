import { mquestions } from "./questions.js";
import { roll, monsters, amountOfQuestions, answered } from "./main.js";
import { renderQ, setupListeners, displayList } from "./quizengine.js";

const questionList = mquestions;

if(displayList.length === 0) {
  for(let i = 0; i < amountOfQuestions; i++) {
    let getMonster = monsters[roll(monsters.length)];
    let wrongMonList = monsters.filter(m => m.name !== getMonster.name);
    let q = roll(questionList.length);

    // get another monster if already used
    if(answered.some(e => e.mon === getMonster.name)) {
        i--;
        continue;
    }

    let wrongMon;
    let wrongMons = [];

    if(q === 1) {
        for(let wm = 0; wm < 3; wm++) {
            wrongMon = wrongMonList[roll(wrongMonList.length)];

            // reroll if rolled monster type matches wm list or answer
            if(wrongMons.some(wmon => wmon.type === wrongMon.type) || 
            wrongMon.type === getMonster.type) {
                --wm;
            } else {
                wrongMons.push(wrongMon);
            }
        }

        displayList.push({
            q: questionList[q].question(getMonster),
            a: [
                questionList[q].answer(getMonster),
                wrongMons[0].type,
                wrongMons[1].type,
                wrongMons[2].type
            ]
        })
    } else
    if(q === 0) {
        for(let wm = 0; wm < 3; wm++) {
            wrongMon = wrongMonList[roll(wrongMonList.length)];

            // reroll if rolled monster hp matches wm list or answer
            if(wrongMons.some(wmon => wmon.hit_points === wrongMon.hit_points) || 
            wrongMon.hit_points === getMonster.hit_points) {
                --wm;
            } else {
                wrongMons.push(wrongMon);
            }
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

    answered.push({
        mon: getMonster.name,
        question: questionList[q].question(getMonster)
    })
  }
}

renderQ();

setupListeners();