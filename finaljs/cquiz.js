import { cquestions } from "./questions.js";
import { roll } from "./main.js";
import { classes } from "./main.js";

const questionList = cquestions;
const displayList = /*JSON.parse(localStorage.getItem('displayList')) || */[];
const answered = [];

if(displayList.length === 0) {
  for(let i=0; i<10; i++) {
    let getClass = classes[roll(classes.length)];
    let wrongClassList = classes.filter(c => c.classInfo.name !== getClass.classInfo.name);
    let q = roll(questionList.length);

    // skip question if already been answered for this class
    if(answered.some(e => e[0].class === getClass.classInfo.name && e[0].question === questionList[q].question(getClass))) {
        i--;
        continue;
    }

    if(q == 2) {
        let lev = roll(getClass.levels.length);
        let fea = roll(getClass.levels[lev].features.length);
        let wrongClasses = [];

        let wrongClass = wrongClassList[roll(wrongClassList.length)];
        let wrongLev = roll(wrongClass.levels.length);
        let wrongFea = roll(wrongClass.levels[wrongLev].features.length);

        for(let i = 0; i < 3; i++) {
            wrongClass = wrongClassList[roll(wrongClassList.length)];
            wrongLev = roll(wrongClass.levels.length);
            wrongFea = roll(wrongClass.levels[wrongLev].features.length);

            while(wrongClass.levels[wrongLev].features.length === 0 || wrongClass.levels[wrongLev].features[wrongFea].name === 'Ability Score Improvement' || wrongClasses.some(wc => wc.wrongClass.classInfo.name === wrongClass.classInfo.name)) {
                wrongClass = wrongClassList[roll(wrongClassList.length)];
                wrongLev = roll(wrongClass.levels.length);
                wrongFea = roll(wrongClass.levels[wrongLev].features.length);
            }

            wrongClasses.push({wrongClass, wrongLev, wrongFea});


            if(wrongClasses.length === 3) {
                wrongClasses.forEach(wc => console.log(wc.wrongClass.classInfo.name));
            };
            console.log('---');
        }

        // skip if no features or is ability score improvement
        while(getClass.levels[lev].features.length === 0 || getClass.levels[lev].features[fea].name === 'Ability Score Improvement') {
            lev = roll(getClass.levels.length);
            fea = roll(getClass.levels[lev].features.length);
        }

        displayList.push({
            q: questionList[q].question(getClass),
            a: [questionList[q].answer(getClass, lev, fea),
            wrongClasses[0].wrongClass.levels[wrongClasses[0].wrongLev].features[wrongClasses[0].wrongFea].name,
            wrongClasses[1].wrongClass.levels[wrongClasses[1].wrongLev].features[wrongClasses[1].wrongFea].name,
            wrongClasses[2].wrongClass.levels[wrongClasses[2].wrongLev].features[wrongClasses[2].wrongFea].name]
        });

        answered.push([{
            class: getClass.classInfo.name,
            question: questionList[q].question(getClass)
        }]);
    } else 
    if(q == 1) {
        let sub = roll(getClass.classInfo.subclasses.length);
        console.log(getClass.classInfo.subclasses[sub].name);
        //let wrongSubs = wrongClassList.filter(wc => wc.classInfo.subclasses);

        displayList.push({
            q: questionList[q].question(getClass),
            // a: [questionList[q].answer(getClass, lev, fea),
            // wrongClasses[0].wrongClass.levels[wrongClasses[0].wrongLev].features[wrongClasses[0].wrongFea].name,
            // wrongClasses[1].wrongClass.levels[wrongClasses[1].wrongLev].features[wrongClasses[1].wrongFea].name,
            // wrongClasses[2].wrongClass.levels[wrongClasses[2].wrongLev].features[wrongClasses[2].wrongFea].name]
        });

        answered.push([{
            class: getClass.classInfo.name,
            question: questionList[q].question(getClass)
        }]);
    }
    
  };
  localStorage.setItem('displayList', JSON.stringify(displayList));
}

console.log(displayList);

let current = 0;

document.getElementById('displayQ').innerText = displayList[current].q;

document.getElementById('pickone').innerHTML = `
<button class="answer" onclick="checkAnswer('${displayList[current].a[0]}')">${displayList[current].a[0]}</button>
<button class="answer" onclick="checkAnswer('${displayList[current].a[1]}')">${displayList[current].a[1]}</button>
<button class="answer" onclick="checkAnswer('${displayList[current].a[2]}')">${displayList[current].a[2]}</button>
<button class="answer" onclick="checkAnswer('${displayList[current].a[3]}')">${displayList[current].a[3]}</button>
`;