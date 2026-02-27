const bids = [];
const retrieveCart = JSON.parse(localStorage.getItem('bids')) || [];

function saveBidsToLocalStorage() {
  localStorage.setItem('bids', JSON.stringify(bids));
}

document.getElementById('bid1').addEventListener('click', () => {
  if(document.getElementById('bidder1').value && document.getElementById('bidder1').value > 0){
    const input = document.getElementById('bidder1').value;
    bids.push(input);
    console.log(bids);
  }
})