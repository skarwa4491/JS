let rows = 100;
let cols = 26;
let rowContainer = document.querySelector(".rows");
let colContainer = document.querySelector(".cols");
let grid = document.querySelector(".cells");
let addressbar = document.querySelector(".address-bar");

let sheetDB = [];
let defaultCellProp = {
  fontFamily: "monospace",
  fontSize: 14,
  bold: false,
  italic: false,
  underLine: false,
  alignment: "left",
  cellColor: "#f1f3f5",
  fontColor: "",
  formula: "",
  value: "",
};

/** display rows */
(function () {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    row.innerText = `${i + 1}`;
    rowContainer.appendChild(row);
  }
})();

/** display cols */
(function () {
  for (let i = 0; i < cols; i++) {
    const col = document.createElement("div");
    col.setAttribute("class", "col");
    col.innerText = `${String.fromCharCode(65 + i)}`;
    colContainer.appendChild(col);
  }
})();

/** display cells and add eventListeners */
function generateCells() {
  for (let i = 0; i < rows; i++) {
    const cellRow = document.createElement("div");
    cellRow.setAttribute("class", "cell-row");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.setAttribute("contenteditable", true);
      cell.setAttribute("spellcheck", false);
      cell.setAttribute("class", "cell");
      cell.setAttribute("row", `${i}`);
      cell.setAttribute("col", `${j}`);
      cell.setAttribute("cell-name", `${createCellAddress(i, j)}`);
      addListenerToPrintCellOnAddressBar(cell);
      cellRow.appendChild(cell);
    }
    grid.appendChild(cellRow);
  }

  function addListenerToPrintCellOnAddressBar(cell) {
    cell.addEventListener("click", (e) => {
      let cellName = cell.getAttribute("cell-name");
      addressbar.value = cellName;
    });
  }
}

/** create cell address */
function createCellAddress(row, col) {
  return `${String.fromCharCode(65 + col)}${row + 1}`;
}

/** generate cells */
generateCells();

/** click on first cell */
document.querySelector(`div[cell-name='A1']`).click();

function createCellDB() {
  let cellRows = document.querySelectorAll(".cell-row");
  let sheetRow = [];
  cellRows.forEach((cellRow) => {
    let sheetRow = [];
    let allCells = cellRow.querySelectorAll(".cell");
    allCells.forEach((cell) => {
      let cellProp = Object.assign({}, defaultCellProp);
      cellProp.cellName = cell.getAttribute("cell-name");
      cellProp.children = [];
      sheetRow.push(cellProp);
    });
    sheetDB.push(sheetRow);
  });
}

/** create cell DB */
createCellDB();
