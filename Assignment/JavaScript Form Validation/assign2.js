const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const ans = document.getElementById("ans");
const question = document.getElementById("question"); 
let counter = 1;
const answer = document.getElementById("answer");
const container = document.getElementById("container");

question.addEventListener("input",function(){
const quest = question.value;
if(!quest.includes('?')){
    ans.textContent = "Question is required.";
    ans.style.color = "red";
    question.focus();
    return;
}
if(quest.length < 5){
    ans.textContent = "question required, minimum 5 characters";
    ans.style.color = "red";
    question.focus();
    return;
}
else{
        ans.textContent = "Entered correct!";
        ans.style.color = "green";
    }
});

answer.addEventListener("input",function(){
    const answers = answer.value;
    if(!answers.includes('.')){
        ans.textContent = "Answer is required.";
        ans.style.color = "red";
        answer.focus();
        return;
    }
    if(answers.length < 15){
        ans.textContent = "answer required, minimum 15 characters";
        ans.style.color = "red";
        answer.focus();
        return;
    }
    else{
        ans.textContent = "Entered correct!";
        ans.style.color = "green";
    }
});

addBtn.addEventListener("click",function(){
    const add = document.createElement("p");
    add.classList.add("faq-item");
    add.textContent = "FAQ manager " + counter++;
    container.append(add);
});

deleteBtn.addEventListener("click",function(){
    const del = document.getElementsByClassName("faq-Item");
    if(del){
        ans.textContent = "No FAQs available";
        del.remove();
        counter--;
    }
    else{
        ans.textContent = "Available";
    }
});


document.getElementById("addBtn").addEventListener("click",function(){
container.insertAdjacentHTML("beforeend","<p>Dynamically inserted</p>");
});
