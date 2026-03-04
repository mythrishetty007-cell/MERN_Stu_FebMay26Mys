// Basics of Objects
const person = {
    name:"Rahul",
    age:30,
    isStudent: false
};
console.log("Person",person);
console.log("Name:",person.name);
console.log("Name:",person["age"]);

// Add a new property
person.city = "Mysore";
console.log("Person:",person);
// Modify
person.age = 31;
// console.log("Person:",person);
// delete
delete person.isStudent;
console.log("Person:",person);
// Object constructor
const car = new Object();
car.make = "Audi";
car.model = "A4";
car.year = 2026;
console.log(car);