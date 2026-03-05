// Filter method
let marks = [75,49,56,70,82,51,68];
let passed = marks.filter(mark => mark >=70);

// console.log(marks);
// console.log(passed);

let scores = [
   {name:"sonika",score: 77},
   {name:"rajeshwari",score: 76},
   {name:"mythri",score: 74},
   {name:"sowmya",score: 45},
   {name:"ramya",score: 58},
   {name:"rashmi",score: 34}
];
// let pass = scores.filter(marks => marks.score>70);
// let pass1 = pass.map(marks => marks.name);
let pass2 = scores.filter(marks => marks.score>70).map(marks => marks.name);
// console.log(scores);
// console.log("Passed students: ",pass);
// console.log(pass1);
console.log(pass2);