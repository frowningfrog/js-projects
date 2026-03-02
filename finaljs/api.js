export async function getData() {
  const masterList = await fetch("https://www.dnd5eapi.co/api/2014");
  if(!masterList.ok) {
    console.error("Failed to fetch dnd data");
    return;
  }
  return await masterList.json();
}