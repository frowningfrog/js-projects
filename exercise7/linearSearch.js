function linearSearch(arr, val) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === val) {
            return i;
        } else 
        if(i === arr.length - 1) {
            return -1;
        }
    }
}

const arr = [1, 2, 3, 4, 5];

console.log(linearSearch(arr, 1));
console.log(linearSearch(arr, 5));
console.log(linearSearch(arr, 6));