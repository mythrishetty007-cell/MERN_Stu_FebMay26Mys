const asyncFetchBtn = document.getElementById("asyncFetchBtn");
const output = document.getElementById("output");
const postIdInput = document.getElementById("postIdInput");

asyncFetchBtn.addEventListener("click", async function () {
    // output.textContent = "Loading user...";
    try {
        output.textContent ="Fetching post...";
        const id = postIdInput.value.trim();
        if (id === "") {
            output.textContent = "Post ID is required.";
            return;
        }
        const numericId = Number(id); //give value to the id
        if (numericId < 1 || numericId > 100) {
            output.textContent = "Enter vaild id b/w 1 & 100";
            return;
        } 
        const response = await
            fetch("https://jsonplaceholder.typicode.com/posts/"+numericId);
        if (!response.ok) throw new Error("HTTP error:" + response.status);
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
    }
    catch (error) {
        output.textContent = "Error: " + error.message;
    }
});