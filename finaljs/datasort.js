import { getClasses } from "./api.js";

async function fetchData() {
  const result = await getClasses();
  return result;
}

const data = await fetchData();

console.log(data[10].name);