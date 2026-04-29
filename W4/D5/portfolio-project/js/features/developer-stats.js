/*
File: developer-stats.js
Description: Fetches developer statistics from a JSON file and renders them into the portfolio.

Brief Concept Explanation:
- This file uses the Fetch API to load JSON data asynchronously.
- response.json() converts the response into a JavaScript object.
- try/catch handles errors safely.
- The fetched data is then rendered into the DOM dynamically.
*/

async function initDeveloperStats() {
  const statsContainer = document.getElementById("stats-container");
  const statsMessage = document.getElementById("stats-message");

  if (!statsContainer || !statsMessage) {
    console.log("Developer stats elements not found.");
    return;
  }

  statsContainer.innerHTML = "";
  statsMessage.textContent = "Loading developer stats...";

  try {
    const response = await fetch("mock/developer-stats.json");

    if (!response.ok) {
      throw new Error("Failed to load stats. Status: " + response.status);
    }

    const data = await response.json();

    console.log("Developer stats loaded:", data);

    statsMessage.textContent = "";

    const statsList = [
      {
        title: "Projects",
        value: data.projects
      },
      {
        title: "GitHub Commits",
        value: data.githubCommits
      },
      {
        title: "LeetCode Solved",
        value: data.leetcodeSolved
      },
      {
        title: "Focus Area",
        value: data.focusArea
      }
    ];

    statsList.forEach(function (item) {
      const card = document.createElement("div");
      card.className = "bg-white rounded-3xl shadow-lg p-8 text-center";

      const heading = document.createElement("h3");
      heading.className = "text-xl font-bold mb-4";
      heading.textContent = item.title;

      const value = document.createElement("p");
      value.className = "text-2xl font-semibold text-blue-700";
      value.textContent = item.value;

      card.appendChild(heading);
      card.appendChild(value);

      statsContainer.appendChild(card);
    });

  } catch (error) {
    console.log("Developer stats fetch error:", error);
    statsMessage.textContent = "Unable to load developer stats at the moment.";
    statsMessage.className = "text-center mb-8 text-sm text-red-500";
  }
}