export async function getClasses() {
  const classes = await fetch("https://www.dnd5eapi.co/api/2014/classes");
  if(!classes.ok) {
    console.error("Failed to fetch dnd data");
    return;
  }

  const data = await classes.json();

  const classList = [];

  for(let i=0; i<data.results.length; i++) {
    const c = await fetch("https://www.dnd5eapi.co" + data.results[i].url);
    const l = await fetch("https://www.dnd5eapi.co" + data.results[i].url + "/levels");
    if(!c.ok || !l.ok) {
      console.error("Failed to fetch dnd data");
      return;
    }
    const classInfo = await c.json();
    const levels = await l.json();
    classList.push({classInfo, levels});
  }

  return classList;
}