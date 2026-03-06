import { cquestions } from "./questions.js";
import { roll } from "./main.js";
import { classes } from "./main.js";

const questionList = cquestions;
const displayList = /*JSON.parse(localStorage.getItem('displayList')) || */[];
const answered = [];
let score = 0;

function checkAnswer(ans) {
    if(ans === displayList[current].a[0]) {
        score++;
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    current++;
    document.getElementById('pickone').innerHTML = '';
    renderQ()
    if(current === displayList.length-1) {
        document.getElementById('main').innerHTML = `
        <div class="title">Quiz Complete!</div>
        <div id="score">Final Score: ${score}/10</div>`;
        alert(`Quiz complete! Final score: ${score}/10`);
        localStorage.removeItem('displayList');
    }
}

if(displayList.length === 0) {
  score = 0;
  for(let i=0; i<10; i++) {
    let getClass = classes[roll(classes.length)];
    let wrongClassList = classes.filter(c => c.classInfo.name !== getClass.classInfo.name);
    let q = roll(questionList.length);

    // skip question if already been answered for this class
    if(answered.some(e => e[0].class === getClass.classInfo.name && e[0].question === questionList[q].question(getClass))) {
        i--;
        continue;
    }

    let wrongClass;
    let wrongClasses = [];

    if(q == 2) {
        let lev = roll(getClass.levels.length);
        let fea = roll(getClass.levels[lev].features.length)

        let wrongLev;
        let wrongFea;

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

        for(let i = 0; i < 3; i++) {
            wrongClass = wrongClassList[roll(wrongClassList.length)];

            while(wrongClasses.some(wc => wc.classInfo.subclasses[sub].name === wrongClass.classInfo.subclasses[sub].name)) {
                wrongClass = wrongClassList[roll(wrongClassList.length)];
            }

            wrongClasses.push(wrongClass);

            if(wrongClasses.length === 3) {
                wrongClasses.forEach(wc => console.log(wc.classInfo.name));
            };
            console.log('---');
        }

        displayList.push({
            q: questionList[q].question(getClass),
            a: [questionList[q].answer(getClass, sub),
            wrongClasses[0].classInfo.subclasses[sub].name,
            wrongClasses[1].classInfo.subclasses[sub].name,
            wrongClasses[2].classInfo.subclasses[sub].name]
        });

        answered.push([{
            class: getClass.classInfo.name,
            question: questionList[q].question(getClass)
        }]);
    } else 
    if(q == 0) {
        for(let i = 0; i < 3; i++) {
            wrongClass = wrongClassList[roll(wrongClassList.length)];

            while(String(getClass.classInfo.hit_die) === String(wrongClass.classInfo.hit_die) || wrongClasses.some(wc => String(wc.classInfo.hit_die) === String(wrongClass.classInfo.hit_die))) {
                wrongClass = wrongClassList[roll(wrongClassList.length)];
            }

            wrongClasses.push(wrongClass);

            if(wrongClasses.length === 3) {
                wrongClasses.forEach(wc => console.log(String(wc.classInfo.hit_die)));
            };
            console.log('---');
        }

        displayList.push({
            q: questionList[q].question(getClass),
            a: [String(questionList[q].answer(getClass)),
            String(wrongClasses[0].classInfo.hit_die),
            String(wrongClasses[1].classInfo.hit_die),
            String(wrongClasses[2].classInfo.hit_die)]
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

const renderQ =  () => {
    document.getElementById('displayQ').innerText = displayList[current].q;
    let nums = [0, 1, 2, 3];
    nums.sort(() => roll(4) - 2);
    ['one', 'two', 'three', 'four'].forEach((id, index) => {
        document.getElementById('pickone').innerHTML += `<button id="${id}" data-index="${index}" class="answer">${displayList[current].a[nums[index]]}</button>`;
    })
}

renderQ()

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('answer')) {
        checkAnswer(e.target.innerText);
    }
});