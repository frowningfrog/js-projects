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
  document.getElementById('box').innerHTML = `<img src="${pics[0].sprites.front_default}">`;
  document.getElementById('pokemon-name').innerText = `1. ${pokeName}`;

  let i = 0;

  document.getElementById('left').addEventListener('click', () => {
    if(i!==0){
      i--;
      pokeName = data.results[i].name;
      pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
      document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}">`;
      document.getElementById('pokemon-name').innerText = `${i+1}. ${pokeName}`;
      document.getElementById('details').innerText = ``;
      document.getElementById('stats').innerText = ``;
    }
  })

  document.getElementById('right').addEventListener('click', () => {
    if(i!==data.results.length-1){
      i++;
      pokeName = data.results[i].name;
      pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
      document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}">`;
      document.getElementById('pokemon-name').innerText = `${i+1}. ${pokeName}`;
      document.getElementById('details').innerText = ``;
      document.getElementById('stats').innerText = ``;
    }
  })

  document.getElementById('pokemon-name').addEventListener('click', async () => {
    const deets = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.results[i].name}`);
    const details = await deets.json();
    document.getElementById('details').innerHTML = `
    <p>Weight: ${details.weight}</p>
    <p>Height: ${details.height}</p>
    <p>Type 1: ${details.types[0].type.name.charAt(0).toUpperCase() + details.types[0].type.name.slice(1)}</p>
    <p>Type 2: ${details.types[1] ? details.types[1].type.name.charAt(0).toUpperCase() + details.types[1].type.name.slice(1) : 'none'}</p>`;
    document.getElementById('stats').innerText = ``;
    details.stats.forEach(stat => {
      document.getElementById('stats').innerText += `${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: ${stat.base_stat}\n`;
    });
  })

  document.getElementById('search').addEventListener('click', () => {
    const input = document.getElementById('userInput').value;
    i = +input - 1;
    pokeName = data.results[i].name;
    pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
    document.getElementById('userInput').value = ``;
    document.getElementById('userInput').placeholder = `Enter number`;
    document.getElementById('box').innerHTML = `<img src="${pics[i].sprites.front_default}">`;
    document.getElementById('pokemon-name').innerText = `${i+1}. ${pokeName}`;
    document.getElementById('details').innerText = ``;
    document.getElementById('stats').innerText = ``;
  })
})

