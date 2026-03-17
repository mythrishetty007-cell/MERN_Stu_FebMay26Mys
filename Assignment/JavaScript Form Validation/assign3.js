const form = document.getElementById("feedbackFrom");
const nameInput = document.getElementById("fbname");
const email = document.getElementById("fbemail");
const type = document.getElementById("fbtype");
const feedback = document.getElementById("feedbacks");
const message = document.getElementById("message");

const cardContainer = document.getElementById("feedbackCard");
const countDisplay = document.getElementById("count");

let feedbackCount = 0;

addEventListener("submit", function (e) {
    e.preventDefault();
    const nameValue = nameInput.value.trim();
    const emailValue = email.value.trim();
    const typeValue = type.value;
    const feedbackValue = feedback.value.trim();

    if (!emailValue) {
        message.textContent = "Email is required";
        message.style.color = "red";
        email.focus();
        return;
    }
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
        message.textContent = "Please enter valid email id";
        message.style.color = "red";
        email.focus();
        return;
    }
    if (feedbackValue.length < 20) {
        message.textContent = "Feedback must be atleast 20 characters";
        message.style.color = "red";
        return;
    }
    else {
        message.textContent = "Feedback given successfully";
        message.style.color = "green";

    }

    // for card 
    const card = document.createElement("div");

    let label = " ";

    if (type.value === "Bug") {
        label = "[Needs Review]";
    }
    else if (type.value === "Suggestion") {
        label = "[Idea]";
    }
    else if (type.value === "Appreciation") {
        label = "[Positive]";
    }

    card.innerHTML = `
    <h3 class="username"></h3>
    <p class="email"></p>
    <p class="type"></p>
    <p class="text"></p>
    <hr>
    `;

    card.querySelector(".username").textContent = nameValue;
    card.querySelector(".email").textContent = emailValue;
    card.querySelector(".type").textContent = typeValue + " " + label;
    card.querySelector(".text").textContent = feedbackValue;

    cardContainer.appendChild(card);

    feedbackCount++;
    countDisplay.textContent=feedbackCount;

});  

    document.getElementById("deleteBtn").addEventListener("click",function(){
        if(cardContainer.lastElementChild){
            cardContainer.removeChild(cardContainer.lastElementChild);
            feedbackCount--;
            countDisplay.textContent=feedbackCount;
            cardContainer.textContent = "feedback form deleted."
        }
        else{
            cardContainer.textContent = "No feedback form submitted";
        }
    });    

email.addEventListener("input", () => message.textContent = "");
feedback.addEventListener("input", () => message.textContent = "");