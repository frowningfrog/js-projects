const getClassesQuery = `
query GetClassesQuery($limit: Int) {
  classes(limit: $limit) {
    name
   subclasses {
    name
   }
    hit_die
    class_levels {
      level
      features {
        name
      }
    }
  }
}`
// export async function getClasses() {
//   const response = await fetch("https://www.dnd5eapi.co/graphql/2014", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       query: getClassesQuery
//     })
//   });
//   if(!response.ok) {
//     console.error("Failed to fetch classes data");
//     return;
//   }

//   const {data} = await response.json();

//   const cpromises = [];
//   const lpromises = [];
  
//   // for(let i=0; i<data.results.length; i++) {
//   //   const c = fetch("https://www.dnd5eapi.co" + data.results[i].url).then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch classes data'));
//   //   const l = fetch("https://www.dnd5eapi.co" + data.results[i].url + "/levels").then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch classes data'));
    
//   //   cpromises.push(c);
//   //   lpromises.push(l);
//   // }

//   // const classInfo = await Promise.all(cpromises).then((classRes) => {
   
//   //   return classRes;
//   // })
//   const classInfo = data.classes.map(c => {
//     return {
//       ...c,
//       levels: c.class_levels
//     }
//   })

//   // const levels = await Promise.all(lpromises).then((classLev) => {
   
//   //   return classLev;
//   // })
//   const levels = data.classes.map(singleClass => singleClass.class_list)
// console.log({classInfo,levels})
// //   for(let i=0; i<classInfo.length; i++){
// //     classInfo[i].levels = leve;
// //   }

//   return classInfo;
// }
export async function getClasses() {
  console.time('test c');
  const classes = await fetch("https://www.dnd5eapi.co/api/2014/classes");
  if(!classes.ok) {
    console.error("Failed to fetch classes data");
    return;
  }

  const data = await classes.json();

  const cpromises = [];
  const lpromises = [];
  
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

  console.timeEnd('test c')
  return classInfo;
}

const GetMonstersQuery = `
  query GetMonsters($limit: Int) {
    monsters(limit: $limit) {
      name
      hit_dice
      hit_points
      type
    }
  }
`;

export async function getMonsters() {
  console.time('test m');
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

  // const promises = [];

  // async function fetchWithBackoff(url) {
  //   const maxRetries = 5;
  //   let delay = 50;

  //   for (let attempt = 0; attempt <= maxRetries; attempt++) {
  //     try {
  //       const res = await fetch(url);
  //       if (!res.ok) throw new Error("retryable");

  //       return res;

  //     } catch (err) {
  //       if (attempt === maxRetries) throw err;
  //       console.log('retrying...', {url, attempt, delay});

  //       await new Promise(r => setTimeout(r, delay));
  //       delay *= 3;
  //     }
  //   }
  // }

  // for(let i=0; i<data.results.length; i++) {
  //   const m = fetchWithBackoff("https://www.dnd5eapi.co" + data.results[i].url).then(r => r.ok ? r.json() : console.error('Yikes, Failed to fetch monsters data'));
    
  //   promises.push(m);
  // }

  // const monsterInfo = await Promise.all(promises).then((monsterRes) => {

  //   return monsterRes;
  // })
  console.timeEnd('test m');
  
  return data.monsters;
}