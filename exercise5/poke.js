const pokeBtn = document.querySelector("#pokeButton");

pokeBtn.addEventListener('click', async () => {
  const masterList = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await masterList.json();
  console.log(data);
})