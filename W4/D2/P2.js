// CreateElement() & appendChild()
const list = document.getElementById("list");
let counter = 1;

document.getElementById("addBtn").addEventListener("click",function(){
    errMessage.textContent = "";
    const li = document.createElement("li");
    li.textContent = "Item " + counter++;
    list.appendChild(li);
});

document.getElementById("rmBtn").addEventListener("click",function(){
    if(list.lastElementChild){
        list.removeChild(list.lastElementChild);
    }
    else{
        errMessage.textContent = "No Items to be deleted";
    }
});