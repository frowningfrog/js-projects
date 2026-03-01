document.addEventListener('DOMContentLoaded', () => {
  const bids = JSON.parse(localStorage.getItem('bids')) || [];

  function saveBidsToLocalStorage(bids) {
    localStorage.setItem('bids', JSON.stringify(bids));
  };

  function updateHighestBid() {
    if (bids.length > 0) {
      const highestBid = bids.reduce((max, bid) => bid.amount > max.amount ? bid : max, bids[0]);
      document.getElementById('highestBid').textContent = `${highestBid.bidder}- $${highestBid.amount}`;
    } else {
      document.getElementById('highestBid').textContent = 'No bids yet';
    };
  };

  function updateBidHistory() {
    document.getElementById('bidList').innerHTML = '';
    for(let i=bids.length-1; i>=0; i--){
      const bid = bids[i];
      document.getElementById('bidList').innerHTML += `<li>${bid.bidder} - $${bid.amount}</li>`;
    };
  };

  updateHighestBid();
  updateBidHistory();

  document.getElementById('clear').addEventListener('click', () => {
    bids.length = 0;
    saveBidsToLocalStorage(bids);
    console.log(bids);
    updateHighestBid();
    updateBidHistory();
  });

  document.getElementById('bid1').addEventListener('click', () => {
    if(document.getElementById('bidder1').value > 0){
      const input = document.getElementById('bidder1').value;
      bids.push({bidder: 'bidder1', amount: +input});
    };
    document.getElementById('bidder1').value = '';
    document.getElementById('bidder1').placeholder = '';
    saveBidsToLocalStorage(bids);
    console.log(bids);
    updateHighestBid();
    updateBidHistory();
  });

  document.getElementById('bid2').addEventListener('click', () => {
    if(document.getElementById('bidder2').value > 0){
      const input = document.getElementById('bidder2').value;
      bids.push({bidder: 'bidder2', amount: +input});
    };
    document.getElementById('bidder2').value = '';
    document.getElementById('bidder2').placeholder = '';
    saveBidsToLocalStorage(bids);
    console.log(bids);
    updateHighestBid();
    updateBidHistory();
  });
});