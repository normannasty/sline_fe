export function displayHansgroheResults(data, container) {
  const displayKeys = {
    _cikk: "Termék kód",
    hg_listaar: "HG Listaár",
    hg: "HG ár",
    kucza: "Kucza ár",
    farszer: "Farszer ár",
    sp: "SP ár",
    cu: "CU ár",
    kucza_keszlet: "Kucza Készlet",
    cu_keszlet: "CU Készlet",
  };

  const table = document.createElement("table");
  table.className = "table";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  Object.keys(displayKeys).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = displayKeys[key]; // Use the friendly name
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach((item) => {
    const row = document.createElement("tr");

    // Extract and compare prices, considering null or undefined values
    // Initialize prices object with null for non-existent or "N/A" values
    const prices = {
      hg: item.hg && item.hg !== "N/A" ? parseFloat(item.hg) : null,
      kucza: item.kucza && item.kucza !== "N/A" ? parseFloat(item.kucza) : null,
      sp: item.sp && item.sp !== "N/A" ? parseFloat(item.sp) : null,
      cu: item.cu && item.cu !== "N/A" ? parseFloat(item.cu) : null,
      farszer:
        item.farszer && item.farszer !== "N/A"
          ? parseFloat(item.farszer)
          : null,
    };

    // Create a map to store the ranking of each price
    let priceRanking = {};
    Object.entries(prices)
      .filter(([, value]) => value !== null) // Filter out null values
      .sort(([, a], [, b]) => a - b)
      .forEach(([key], index) => {
        if (!priceRanking[prices[key]]) {
          priceRanking[prices[key]] = [];
        }
        priceRanking[prices[key]].push(key);
      });

    // Iterate through keys and create table cells
    Object.keys(displayKeys).forEach((key) => {
      const td = document.createElement("td");
      td.textContent = item[key] || "N/A"; // Handle null or undefined values

      // Determine the color based on the ranking, only if value is not "N/A"
      if (item[key] !== "N/A") {
        const priceValue = prices[key];
        // Check if priceValue is not null before determining rank
        if (priceValue !== null) {
          const rank =
            Object.keys(priceRanking).indexOf(String(priceValue)) + 1;

          if (rank === 1) {
            td.style.backgroundColor = "rgb(102,204,0)"; // Green for lowest price
          } else if (rank === 2) {
            td.style.backgroundColor = "rgb(51,153,255)"; // Blue for second lowest
          } else if (rank === 3) {
            td.style.backgroundColor = "rgb(252,62,62)"; // Red for third lowest
          }
        }
      }

      row.appendChild(td);
    });

    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}
