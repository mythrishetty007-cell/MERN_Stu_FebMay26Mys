// console.log("Document Object:",document);
// console.log("Page title:",document.title);

// const heading = document.getElementById("mainHeding");
// console.log("Heading text",heading.textContent);

// getElementsByClassName
const info = document.getElementsByClassName("info");
const run = document.getElementById("run");

//getElementsByTagName
const spanTag = document.getElementsByTagName("span");

run.addEventListener("click", function () {
    for (let i = 0; i < info.length; i++) {
        console.log(info[i].textContent);
        info[i].style.color = "blue";
    }
    for (let i = 0; i < spanTag.length; i++) {
        spanTag[i].style.backgroundColor = "lightgreen";
    }

    //Query selector:returns the first element
    // matching a css selector
    const mainFirstHeading = document.querySelector(".mainHeading");
    mainFirstHeading.style.color = "red";

});

// Query selector all:returns all elements matching the 
// selector (It is static)
const tasks = document.querySelectorAll(".task");
// task.style.color = "purple";
tasks.forEach(function(task){
    task.style.color = "purple";
});