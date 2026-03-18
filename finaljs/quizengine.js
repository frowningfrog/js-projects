import { roll, statListen, amountOfQuestions } from "./main.js";
import { homeListen } from "./stats.js";

let score = 0;
let current = 0;
let correct = false;

export const displayList = /*JSON.parse(localStorage.getItem('displayList')) || */[];
let classStats = JSON.parse(localStorage.getItem('classStats')) || [];
let monStats = JSON.parse(localStorage.getItem('monStats')) || [];

export const renderQ =  () => {
    document.getElementById('displayQ').innerText = `Question ${current + 1}: ` + displayList[current].q;
    let nums = [0, 1, 2, 3];
    nums.sort(() => roll(4) - 2);
    document.getElementById('pickone').innerHTML = ``;
    document.getElementById('n').innerHTML = ``;
    ['one', 'two', 'three', 'four'].forEach((id, index) => {
        document.getElementById('pickone').innerHTML += `<button id="${id}" data-index="${index}" class="answer">${displayList[current].a[nums[index]]}</button>`;
    })
};

export function setupListeners() { document.addEventListener('click', (e) => {
    if(e.target.classList.contains('answer')) {
        checkAnswer(e.target.innerText);
    } else
    if(e.target.classList.contains('next')) {
        current++;
        if(current < displayList.length) {
            renderQ();
        } else {
            document.getElementById('quiz').innerHTML = ``;
            document.getElementById('quiz').innerHTML = `
            <div class="title">Quiz Complete!</div>
            <div id="score">Final Score: ${score}/10</div>
            <div class="d-flex">
                <button class="gotoHome">Home</button>
                <button class="gotoStats">Stats</button>
            </div><div></div>`;
            localStorage.removeItem('displayList');
            const currentDate = new Date().toLocaleDateString('en-US');
            if(localStorage.getItem('quizType') === 'class') {
                classStats.push({currentDate, score, amountOfQuestions});
                localStorage.setItem('classStats', JSON.stringify(classStats));
            } else 
            if(localStorage.getItem('quizType') === 'monster') {
                monStats.push({currentDate, score, amountOfQuestions});
                localStorage.setItem('monStats', JSON.stringify(monStats));
            }
            homeListen();
            statListen();
        }
    }
})};

function checkAnswer(ans) {
    if(ans === displayList[current].a[0]) {
        correct = true;
    } else {
        correct = false;
    }
    
    document.getElementById('displayQ').innerHTML = correct ? 'Correct!' : 'Incorrect.';
    document.getElementById('n').innerHTML = `<button class="next">next</button>`;
    document.getElementById('pickone').innerHTML = ``;
    
    if(correct) {
        ++score;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
};