import { cquestions } from "./questions.js";
import { roll, classes, amountOfQuestions, answered } from "./main.js";
import { renderQ, setupListeners, displayList } from "./quizengine.js";

const questionList = cquestions;

if(displayList.length === 0) {
  for(let i=0; i<amountOfQuestions; i++) {
    let getClass = classes[roll(classes.length)];
    let wrongClassList = classes.filter(c => c.name !== getClass.name);
    let q = roll(questionList.length);

    //skip question if already been answered for this class
    if(answered.some(e => e.class === getClass.name && e.question === questionList[q].question(getClass))) {
        i--;
        continue;
    };

    let wrongClass;
    let wrongClasses = [];

    if(q === 2) {
        let lev = roll(getClass.levels.length);
        let fea = roll(getClass.levels[lev].features.length);

        let wrongLev;
        let wrongFea;

        for(let i = 0; i < 3; i++) {
            wrongClass = wrongClassList[roll(wrongClassList.length)];
            wrongLev = roll(wrongClass.levels.length);
            wrongFea = roll(wrongClass.levels[wrongLev].features.length);

            while(wrongClass.levels[wrongLev].features.length === 0 || wrongClass.levels[wrongLev].features[wrongFea].name === 'Ability Score Improvement' || wrongClasses.some(wc => wc.name === wrongClass.name)) {
                wrongClass = wrongClassList[roll(wrongClassList.length)];
                wrongLev = roll(wrongClass.levels.length);
                wrongFea = roll(wrongClass.levels[wrongLev].features.length);
            }

            wrongClasses.push({wrongClass, wrongLev, wrongFea});

            // if(wrongClasses.length === 3) {
            //     wrongClasses.forEach(wc => console.log(wc.wrongClass.name));
            // };
            // console.log('---');
        }

        // skip if no features or is ability score improvement
        while(getClass.levels[lev].features.length === 0 || getClass.levels[lev].features[fea].name === 'Ability Score Improvement') {
            lev = roll(getClass.levels.length);
            fea = roll(getClass.levels[lev].features.length);
        }

        displayList.push({
            q: questionList[q].question(getClass),
            a: [
                questionList[q].answer(getClass, lev, fea),
                wrongClasses[0].wrongClass.levels[wrongClasses[0].wrongLev].features[wrongClasses[0].wrongFea].name,
                wrongClasses[1].wrongClass.levels[wrongClasses[1].wrongLev].features[wrongClasses[1].wrongFea].name,
                wrongClasses[2].wrongClass.levels[wrongClasses[2].wrongLev].features[wrongClasses[2].wrongFea].name
            ]
        })
    } else 
    if(q === 1) {
        let sub = roll(getClass.subclasses.length);

        for(let i = 0; i < 3; i++) {
            wrongClass = wrongClassList[roll(wrongClassList.length)];

            while(wrongClasses.some(wc => wc.subclasses[sub].name === wrongClass.subclasses[sub].name)) {
                wrongClass = wrongClassList[roll(wrongClassList.length)];
            }

            wrongClasses.push(wrongClass);

            // if(wrongClasses.length === 3) {
            //     wrongClasses.forEach(wc => console.log(wc.name));
            // };
            // console.log('---');
        }

        displayList.push({
            q: questionList[q].question(getClass),
            a: [questionList[q].answer(getClass, sub),
            wrongClasses[0].subclasses[sub].name,
            wrongClasses[1].subclasses[sub].name,
            wrongClasses[2].subclasses[sub].name]
        });
    } else 
    if(q === 0) {
        for(let i = 0; i < 3; i++) {
            wrongClass = wrongClassList[roll(wrongClassList.length)];
            while(String(getClass.hit_die) === String(wrongClass.hit_die) || wrongClasses.some(wc => String(wc.hit_die) === String(wrongClass.hit_die))) {
                wrongClass = wrongClassList[roll(wrongClassList.length)];
            }

            wrongClasses.push(wrongClass);

            // if(wrongClasses.length === 3) {
            //     wrongClasses.forEach(wc => console.log(wc.name));
            // };
            // console.log('---');
        }

        displayList.push({
            q: questionList[q].question(getClass),
            a: [String(questionList[q].answer(getClass)),
            String(wrongClasses[0].hit_die),
            String(wrongClasses[1].hit_die),
            String(wrongClasses[2].hit_die)]
        });
    }

    answered.push({
        class: getClass.name,
        question: questionList[q].question(getClass)
    });
  };
  localStorage.setItem('displayList', JSON.stringify(displayList));
  console.log(displayList);
}

renderQ();

setupListeners();