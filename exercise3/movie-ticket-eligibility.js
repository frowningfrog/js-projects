function ageCheck(age, isStudent) {
    if (age < 18 || isStudent) {
        return true;
    }
}

function check(person) {
    if (ageCheck(person.age, person.isStudent)) {
        console.log("Discount ticket granted ✅");
    } else {
        console.log("Regular ticket only ❌");
    }
}

let person1 = { age: 20, isStudent: true };
let person2 = { age: 20, isStudent: false };
let person3 = { age: 17, isStudent: true };
let person4 = { age: 17, isStudent: false };

let people = [person1, person2, person3, person4];

people.forEach(person => {
    check(person);
});

console.log("⬑[This line may have collapsed two console.logs to one line because they are the same message]");