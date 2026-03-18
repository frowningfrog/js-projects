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

let classStats = JSON.parse(localStorage.getItem('classStats')) || [];
let monStats = JSON.parse(localStorage.getItem('monStats')) || [];

classStats.forEach(i => {
    const li = document.createElement('li');
    li.textContent = `${i.currentDate} ${i.score}/${i.amountOfQuestions} ${(i.score/i.amountOfQuestions)*100}%`;
    let cstats = document.getElementById('cstats');
    if(cstats) {
        cstats.appendChild(li);
    }
});

monStats.forEach(i => {
    const li = document.createElement('li');
    li.textContent = `${i.currentDate} ${i.score}/${i.amountOfQuestions} ${(i.score/i.amountOfQuestions)*100}%`;
    let mstats = document.getElementById('mstats');
    if(mstats) {
        mstats.appendChild(li);
    }
});

homeListen();