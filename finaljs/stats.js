export function homeListen() {
  const homebtn = document.querySelectorAll('.gotoHome');

  if(homebtn) {
    homebtn.forEach(btn => {
      btn.addEventListener('click', function() {
        location.href = 'index.html';
      })
    })
  }
}

function renderStats(i, stats) {
  const li = document.createElement('li');
    li.textContent = `${i.currentDate} ${i.score}/${i.amountOfQuestions} ${(i.score/i.amountOfQuestions)*100}%`;
    let s = document.getElementById(stats);
    if(s) {
        s.appendChild(li);
    }
}

let classStats = JSON.parse(localStorage.getItem('classStats')) || [];
let monStats = JSON.parse(localStorage.getItem('monStats')) || [];

classStats.forEach(i => {
    renderStats(i, 'cstats');
});

monStats.forEach(i => {
    renderStats(i, 'mstats');
});

homeListen();