export async function getClasses() {
  const classes = await fetch("https://www.dnd5eapi.co/api/2014/classes");
  if(!classes.ok) {
    console.error("Failed to fetch classes data");
    return;
  }

  const data = await classes.json();

  const cpromises = [];
  const lpromises = [];
  
  // the 20 levels for each class take too long in a graphql for some reason
  for(let i=0; i<data.results.length; i++) {
    const c = fetch("https://www.dnd5eapi.co" + data.results[i].url).then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch classes data'));
    const l = fetch("https://www.dnd5eapi.co" + data.results[i].url + "/levels").then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch classes data'));
    
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

const GetMonstersQuery = `
  query GetMonsters($limit: Int) {
    monsters(limit: $limit) {
      name
      hit_points
      type
    }
  }
`;

export async function getMonsters() {
  // for loop takes too long for over 300 monsters
  const monsters = await fetch("https://www.dnd5eapi.co/graphql/2014", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: GetMonstersQuery,
      variables: { limit: 500 }
    })
  });
  if(!monsters.ok) {
    console.error("Failed to fetch monsters data");
    return;
  }

  const {data} = await monsters.json();
  
  return data.monsters;
}