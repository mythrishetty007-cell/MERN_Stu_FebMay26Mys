// Object Iteration
const book = {
    title: "JS for newbies",
    author: "abcd",
    year: 2026,
};

for(let key in book){
    console.log(key,":",book[key]);
}
console.log("Keys",Object.keys(book));
console.log("Values",Object.values(book));
console.log("Entries",Object.entries(book));