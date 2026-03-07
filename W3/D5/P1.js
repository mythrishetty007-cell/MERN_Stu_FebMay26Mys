// Basic of Click events

const button = document.getElementById("clickBtn");

button.addEventListener("click",function() {
    console.log("Button is clicked");
});

button.addEventListener("click",function() {
    console.log("Second event listener: Button is clicked");
});