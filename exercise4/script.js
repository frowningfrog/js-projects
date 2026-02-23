const run = document.getElementById('run');

run.addEventListener("click", () => {
    let list = [];
    const input = document.getElementById('userInput').value;
    document.getElementById("results").innerHTML = ``; // resets the displayed list for next test

    for(let i=1; i<=input; i++){
        if(i%3===0 && i%5===0){     // checks for both 3 and 5 modular remainder
            list.push('FizzBuzz');
        } else if(i%3===0){         // checks for 3 modular remainder
            list.push('Fizz');
        } else if(i%5===0){         // checks for 5 modular remainder
            list.push('Buzz');
        } else {                    // add the rest of the boring numbers
            list.push(i);
        }
    }
    
    // adds the next number or word to the displayed list
    list.forEach(num => {
        document.getElementById("results").innerHTML += `
        <li>${num}</li>`;
    });
    
    // resets the box for next test
    document.getElementById('userInput').value = ``;
    document.getElementById('userInput').placeholder = `Enter number`;
})