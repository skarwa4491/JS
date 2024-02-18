let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let fontFamily = document.querySelector(".font-family");
let fontSize = document.querySelector(".font-size");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let align = document.querySelectorAll(".align");
let fontColorBtn = document.querySelector(".font-color");
let cellColorBtn = document.querySelector(".cell-color");
let allCells = document.querySelectorAll(".cell");
let formulaBar = document.querySelector(".formula-bar");
let inActiveColor = "#f1f3f5";
let activeColor = "#dee2e6";

function setDefaultStyles(cell) {
  cell.addEventListener("click", (e) => {
    let row = cell.getAttribute("row");
    let col = cell.getAttribute("col");
    let cellProp = sheetDB[row][col];

    /** font weight */
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    boldBtn.style.backgroundColor = cellProp.bold ? activeColor : inActiveColor;

    /** font italic */
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italicBtn.style.backgroundColor = cellProp.italic
      ? activeColor
      : inActiveColor;

    /** font underline */
    cell.style.textDecoration = cellProp.textDecoration
      ? "underline"
      : "normal";
    underlineBtn.style.backgroundColor = cellProp.underLine
      ? activeColor
      : inActiveColor;

    /** font color */
    cellProp.fontColor = fontColorBtn.value;
    fontColorBtn.value = cellProp.fontColor;

    /** cell color */
    cell.style.backgroundColor = cellProp.cellColor;
    cellColorBtn.value = cellProp.cellColor;

    /** font size */
    cell.style.fontSize = `${cellProp.fontSize}px`;
    fontSize.value = cellProp.fontSize;

    /** font family */
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;

    /** text align */
    cell.style.textAlign = cellProp.alignment;
    align.forEach((a) => {
      if ([...a.classList].slice(-1)[0] === cellProp.alignment) {
        a.style.backgroundColor = activeColor;
      } else {
        a.style.backgroundColor = inActiveColor;
      }
    });

    /** formula update */
    formulaBar.value = cellProp.formula;
  });
}

allCells.forEach((cell) => {
  setDefaultStyles(cell);
});

boldBtn.addEventListener("click", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  boldBtn.style.backgroundColor = cellProp.bold ? activeColor : inActiveColor;
});

italicBtn.addEventListener("click", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italicBtn.style.backgroundColor = cellProp.italic
    ? activeColor
    : inActiveColor;
});

underlineBtn.addEventListener("click", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.underLine = !cellProp.underLine;
  cell.style.textDecoration = cellProp.underLine ? "underline" : "none";
  underlineBtn.style.backgroundColor = cellProp.underLine
    ? activeColor
    : inActiveColor;
});

fontColorBtn.addEventListener("change", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.fontColor = fontColorBtn.value;
  cell.style.color = cellProp.fontColor;
});

cellColorBtn.addEventListener("change", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.cellColor = cellColorBtn.value;
  cell.style.backgroundColor = cellProp.cellColor;
});

fontSize.addEventListener("change", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = `${cellProp.fontSize}px`;
});

fontFamily.addEventListener("change", (e) => {
  let currentCell = addressbar.value;
  let [cell, cellProp] = getActiveCell(currentCell);
  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
});

align.forEach((a) => {
  a.addEventListener("click", (e) => {
    let currentCell = addressbar.value;
    let [cell, cellProp] = getActiveCell(currentCell);
    cellProp.alignment = [...a.classList].slice(-1)[0];
    cell.style.textAlign = cellProp.alignment;
    align.forEach((aa) => {
      if (e.target === aa) {
        aa.style.backgroundColor = activeColor;
      } else {
        aa.style.backgroundColor = inActiveColor;
      }
    });
  });
});

function getActiveCell(address) {
  let [row, col] = decodeAddress(address);
  let cell = getCell(row, col);
  let cellProp = sheetDB[row][col];
  return [cell, cellProp];
}

function decodeAddress(address) {
  let col = address.charCodeAt(0) - 65;
  let row = Number(address[1]) - 1;
  return [row, col];
}

function getCell(row, col) {
  return document.querySelector(`div[row='${row}'][col='${col}']`);
}
