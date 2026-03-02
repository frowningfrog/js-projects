import { getData } from "./api.js";

async function fetchData() {
  const result =await getData();
  console.log(result);
}

fetchData();