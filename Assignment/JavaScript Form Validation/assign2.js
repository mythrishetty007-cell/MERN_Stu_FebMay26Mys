const ans = document.getElementById("ans");
const question = document.getElementById("question"); 
const answer = document.getElementById("answer");
const faqcontainer = document.getElementById("faqcontainer");

document.getElementById("addBtn").addEventListener("click",function(){
    if(!question.value){
        ans.textContent = "Question is required";
        question.focus();
        return;
    }
    if(question.value.length<5){
        ans.textContent = "Question must be atleast or minimum 5 characters";
        question.focus();
        return;
    }
    if(answer.value.length<15){
        ans.textContent = "Answer must be atleast or minimum 15 characters";
        answer.focus();
        return;
    }
    ans.textContent = "";
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    h2.textContent = question.value;
    p.textContent = answer.value;

    faqcontainer.appendChild(h2);
    faqcontainer.appendChild(p);

    question.value = "";
    answer.value = "";
});

document.getElementById("deleteBtn").addEventListener("click",function(){
    if(faqcontainer.lastElementChild){
        faqcontainer.removeChild(faqcontainer.lastElementChild);
    }
    else if(!faqcontainer===-1){
        ans.textContent = "FAQ avaliable";
        return;
    }
    else{
        ans.textContent = "No FAQ avaliable";
    }
});