// json stringify parse
const employee = {
    id: 101,
    name: "Sandeep",
    dept: "CSE",
    isActive: true 
};
const jsonString = JSON.stringify(employee);
console.log(jsonString);
console.log(employee);

// JSON  parsing
const parsedObject  = JSON.parse(jsonString);
console.log(parsedObject);