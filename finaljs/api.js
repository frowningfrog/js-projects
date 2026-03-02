export async function getClasses() {
  const classes = await fetch("https://www.dnd5eapi.co/api/2014/classes");
  if(!classes.ok) {
    console.error("Failed to fetch dnd data");
    return;
  }

  const data = await classes.json();

  const classList = [];

  for(let i=0; i<data.results.length; i++) {
    const temp = await fetch("https://www.dnd5eapi.co" + data.results[i].url);
    const temp1 = await temp.json();
    classList.push(temp1);
  }

  return classList;
}