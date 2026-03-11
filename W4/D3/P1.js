const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click",function(){
    console.log("Local storage check",typeof localStorage !== "underfined");
    console.log("Session storage check",typeof sessionStorage !== "underfined");
    console.log("LocalStorage object",localStorage);
    console.log("SessionStorage object",sessionStorage);
});