document.addEventListener('DOMContentLoaded', async () => {
  const masterList = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await masterList.json();

  const picList = [];

  for(let i=0; i<data.results.length; i++) {
    picList.push(await fetch(data.results[i].url));
  }

  const pics = await Promise.all(picList.map(p => p.json()));

  document.getElementById('box').innerHTML = `<img src="${pics[0].sprites.front_default}"><p>${data.results[0].name}</p>`;

  let i = 0;

  document.getElementById('left').addEventListener('click', () => {
    if(i!==0){
      i--;
      console.log(i);
      document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}"><p>${data.results[i].name}</p>`;
    }
  })

  document.getElementById('right').addEventListener('click', () => {
    if(i!==data.results.length-1){
      i++;
      console.log(i);
      document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}"><p>${data.results[i].name}</p>`;
    }
  })

  /*for(let i=0; i<data.results.length; i++) {
    document.getElementById('list').innerHTML += `<img src="${pics[i].sprites.front_default}"><p>${data.results[i].name}</p>`;
  };*/
})