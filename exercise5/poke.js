document.addEventListener('DOMContentLoaded', async () => {
  const masterList = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if(!masterList.ok) {
    console.error("Failed to fetch Pokemon data");
    return;
  }
  const data = await masterList.json();

  const picList = [];

  for(let i=0; i<data.results.length; i++) {
    picList.push(await fetch(data.results[i].url));
  }

  const pics = await Promise.all(picList.map(p => p.json()));
  let pokeName = data.results[0].name;
  pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  document.getElementById('box').innerHTML = `<img src="${pics[0].sprites.front_default}"><p>1. ${pokeName}</p>`;

  let i = 0;

  document.getElementById('left').addEventListener('click', () => {
    if(i!==0){
      i--;
      pokeName = data.results[i].name;
      pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
      document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}"><p>${i+1}. ${pokeName}</p>`;
    }
  })

  document.getElementById('right').addEventListener('click', () => {
    if(i!==data.results.length-1){
      i++;
      pokeName = data.results[i].name;
      pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
      document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}"><p>${i+1}. ${pokeName}</p>`;
    }
  })

  /*for(let i=0; i<data.results.length; i++) {
    document.getElementById('list').innerHTML += `<img src="${pics[i].sprites.front_default}"><p>${data.results[i].name}</p>`;
  };*/
})