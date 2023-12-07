import { displayHansgroheResults } from "./_hansgrohe.js";
import { displayDuravitResults } from "./_duravit.js";
import { displayVilleroyResults } from "./_villeroy.js";

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/tables")
    .then((response) => response.json())
    .then((data) => populateDropdown(data))
    .catch((error) => console.error("Error:", error));
});

function populateDropdown(data) {
  const dropdown = document.getElementById("tableDropdown");
  data.forEach((item) => {
    let option = document.createElement("option");
    option.value = item; // Assuming the endpoint returns an array of strings
    option.textContent = item;
    dropdown.appendChild(option);
  });
}

function displayResults(data, selectedTable) {
  const existingResults = document.getElementById("resultsContainer");
  if (existingResults) {
    existingResults.remove();
  }

  const resultsContainer = document.createElement("div");
  resultsContainer.id = "resultsContainer";
  resultsContainer.className = "container mt-4";

  switch (selectedTable) {
    case "hansgrohe":
      displayHansgroheResults(data, resultsContainer);
      break;
    case "duravit":
      displayDuravitResults(data, resultsContainer);
      break;
    case "villeroy":
      displayVilleroyResults(data, resultsContainer);
      break;
    // Add more cases as needed
  }

  const mainElement = document.querySelector("main");
  mainElement.appendChild(resultsContainer);
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const selectedTable = document.getElementById("tableDropdown").value;
  const searchQuery = document.getElementById("searchInput").value;

  fetch(
    `http://localhost:8080/search?tableName=${selectedTable}&searchValue=${searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayResults(data, selectedTable);
    })
    .catch((error) => console.error("Error:", error));
});
