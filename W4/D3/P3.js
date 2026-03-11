const themeInput = document.getElementById("themeInput");
const output = document.getElementById("output");

document.getElementById("saveBtn").addEventListener("click",function(){
   sessionStorage.setItem("theme",themeInput.value);
   sessionStorage.setItem("userName","Mythri");
   sessionStorage.setItem("loggedIn","true");
   console.log("Saved theme: ",themeInput.value); 
   output.textContent = "Successfully saved to sessionStorage";
   output.style.color = "green";
});

document.getElementById("readBtn").addEventListener("click",function(){
   const theme = sessionStorage.getItem("theme");
   output.textContent = "theme is: "+ theme;
   output.style.color = "green";
});

document.getElementById("removeBtn").addEventListener("click",function(){
    sessionStorage.removeItem("loggedIn");
    output.textContent = "Removed 'loggedIn' ";
    output.style.color = "green";
});

document.getElementById("clearBtn").addEventListener("click",function(){
    sessionStorage.clear();
    output.textContent = "Deleted sessionStorage";
    output.style.color = "red";
});