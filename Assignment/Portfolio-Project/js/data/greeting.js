const hours = new Date().getHours();
const message = document.getElementById("greeting");

if(hours < 12){
    message.textContent = "Good Morning!";
}
else if (hours < 18){
    message.textContent = "Good Afternoon!";
}
else{
    message.textContent = "Good Evening!";
}