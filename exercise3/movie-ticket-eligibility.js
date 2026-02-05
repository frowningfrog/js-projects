// function that checks person stats
function ageCheck(age, isStudent) {
    if (age < 18 || isStudent) {
        return true;
    }
}

// function that spits out result
function check(person) {
    if (ageCheck(person.age, person.isStudent)) {
        console.log("Discount ticket granted ✅");
    } else {
        console.log("Regular ticket only ❌");
    }
}

// create person objects
let person1 = { age: 20, isStudent: true };
let person2 = { age: 20, isStudent: false };
let person3 = { age: 17, isStudent: true };
let person4 = { age: 17, isStudent: false };

// place people in array
let people = [person1, person2, person3, person4];

// run things for each person
people.forEach(person => {
    check(person);
});