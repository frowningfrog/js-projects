// Write a function that takes in an array of numbers. 
// It should return an object with two properties: even and odd. 
// The even property should be an array of all the even numbers in the array. 
// The odd property should be an array of all the odd numbers in the array.

function evenOddSort(nums){
    const e = [];
    const o = [];
    const final = {};
    for(let i=0; i<nums.length; i++){
        (nums[i]%2===0) ? e.push(nums[i]) : o.push(nums[i]);
    }
    final.even = e;
    final.odd = o;
    return final;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(evenOddSort(numbers)); // { even: [2, 4, 6, 8, 10], odd: [1, 3, 5, 7, 9] }