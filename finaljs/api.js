export async function getClasses() {
  const classes = await fetch("https://www.dnd5eapi.co/api/2014/classes");
  if(!classes.ok) {
    console.error("Failed to fetch dnd data");
    return;
  }

  const data = await classes.json();

  const cpromises = [];
  const lpromises = [];
  
  for(let i=0; i<data.results.length; i++) {
    const c = fetch("https://www.dnd5eapi.co" + data.results[i].url).then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch dnd data'));
    const l = fetch("https://www.dnd5eapi.co" + data.results[i].url + "/levels").then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch dnd data'));
    
    cpromises.push(c);
    lpromises.push(l);
  }

  const classInfo = await Promise.all(cpromises).then((classRes) => {
   
    return classRes;
  })

  const levels = await Promise.all(lpromises).then((classLev) => {
   
    return classLev;
  })

  for(let i=0; i<classInfo.length; i++){
    classInfo[i].levels = levels[i];
  }

  return classInfo;
}