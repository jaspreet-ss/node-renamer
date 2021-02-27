// Append empty tables when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  generateEmptyTable(".files-table", "Names");
  generateEmptyTable(".rules-table", "Rules");
  console.log("DOM content has loaded:");
});

// Generate Empty Table
function generateEmptyTable(queryName, tableTitle) {
  let body = document.querySelector(queryName);
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");
  let row = document.createElement("tr");
  let cell = document.createElement("th");
  let cellText = document.createTextNode(tableTitle);
  body.appendChild(tbl);
  cell.appendChild(cellText);
  row.appendChild(cell);
  tblBody.appendChild(row);
  for (let i = 0; i < 0; i++) {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    let cellText = document.createTextNode("");
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
  console.log(tableTitle," table created.");
}

// Append files to table
function appendFilesTable(namesOfFilesAndFolders) {
  let body = document.querySelector(".files-table");
  let tbl = body.getElementsByTagName("table")[0];
  let tblBody = body.getElementsByTagName("tbody")[0];
  for (let i = 0; i < namesOfFilesAndFolders.length; i++) {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    let cellText = document.createTextNode(namesOfFilesAndFolders[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
}

// Append rules to table
function appendRulesTable(rulesToAppend) {
  let body = document.querySelector(".rules-table");
  let tbl = body.getElementsByTagName("table")[0];
  let tblBody = body.getElementsByTagName("tbody")[0];
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  let cellText = document.createTextNode(rulesToAppend);
  cell.appendChild(cellText);
  row.appendChild(cell);
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  body.appendChild(tbl);
  console.log("Appended New Rule.", rulesToAppend)
}

// Append analyze table
function appendAnalyzeTable(namesOfFiles) {
  let analyzeTable = document.querySelector(".analyze-applied-rules");
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");
  for (const [each_file, properties] of Object.entries(
    namesOfFiles
  )) {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    let cellText = document.createTextNode(properties["fileBaseName"]);
    cell.appendChild(cellText);
    row.appendChild(cell);
    
    let cell1 = document.createElement("td");
    let cellText1 = document.createTextNode(properties["fileNewName"]);
    cell1.appendChild(cellText1);
    row.appendChild(cell1);

    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  analyzeTable.appendChild(tbl);
}

module.exports = { generateEmptyTable, appendFilesTable, appendRulesTable, appendAnalyzeTable };
