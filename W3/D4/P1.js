// Array basics
console.log("Array basics");
// Creating arrays
let emptyArray = [];
let numArray = [1,2,3,4];
let mixedArray = [42,"hello",true,null,{name:"Gola"},[5,6]]; 
// console.log(emptyArray);
// console.log(numArray);
// console.log(mixedArray);

// Using constructor
let fruits = new Array("Apple","Mango");
// console.log("Fruits:",fruits);
// console.log("Is fruits an array?",Array.isArray(fruits));

// Push : add
fruits.push("Cherry");
// console.log(fruits);

// pop : remove
fruits.pop();
// console.log(fruits);

// unshift : adds the elements to beginning
fruits.unshift("Orange");
console.log(fruits);

// shift : remove elements from beginning
fruits.shift();
console.log(fruits);