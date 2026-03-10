import { roll } from "./main.js";

let score = 0;
let current = 0;

export const displayList = /*JSON.parse(localStorage.getItem('displayList')) || */[];

export const renderQ =  () => {
    document.getElementById('displayQ').innerText = displayList[current].q;
    let nums = [0, 1, 2, 3];
    nums.sort(() => roll(4) - 2);
    ['one', 'two', 'three', 'four'].forEach((id, index) => {
        document.getElementById('pickone').innerHTML += `<button id="${id}" data-index="${index}" class="answer">${displayList[current].a[nums[index]]}</button>`;
    })
};

export function setupListeners() { document.addEventListener('click', (e) => {
    if(e.target.classList.contains('answer')) {
        checkAnswer(e.target.innerText);
    }
})};

function checkAnswer(ans) {
    if(ans === displayList[current].a[0]) {
        score++;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    
    document.getElementById('pickone').innerHTML = '';
    current++;
    if(current < displayList.length) {
        renderQ()
    } else {
        document.getElementById('quiz').innerHTML = ``;
        document.getElementById('quiz').innerHTML = `
        <div class="title">Quiz Complete!</div>
        <div id="score">Final Score: ${score}/10</div>`;
        localStorage.removeItem('displayList');
    }
};