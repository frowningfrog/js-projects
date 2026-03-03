import { getClasses } from "./api.js";
import { cquestions } from "./questions.js";

async function fetchData() {
  const result = await getClasses();
  return result;
}

function roll(num) {
  return Math.floor(Math.random() * num);
}

const classes = await fetchData();

console.log(classes);
for(let i=0; i<1000; i++) {
  console.log(classes[roll(classes.length)].name);
};