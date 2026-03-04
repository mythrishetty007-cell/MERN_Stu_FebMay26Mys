// Nested Object and Methods
const student = {
    firstName: "Santhosh",
    lastName: "Sharma",
    scores:{
        math: 80,
        science:83
    },
    hobbies:["reading","singing"],
    fullname: function(){
        return this.firstName + " "+this.lastName;
    },
    greet(){
        console.log("Hi,",this.fullname());
    }
};
// console.log(student);
// console.log(student.scores.math);
// console.log(student.fullname());
student.greet();