/** add space before and after operator */

/** add blur event on all cells to store values in DB */
allCells.forEach((cell) => {
  cell.addEventListener("blur", (e) => {
    let address = addressbar.value;
    let row = cell.getAttribute("row");
    let col = cell.getAttribute("col");
    let cellProp = sheetDB[row][col];
    let enteredData = Number(cell.innerText);
    if (cellProp.value === enteredData) return;
    cellProp.value = enteredData;
    removeChildren(cellProp.formula);
    cellProp.formula = "";
    updateChildren(address);
  });
});

formulaBar.addEventListener("keydown", (e) => {
  let formula = formulaBar.value;
  if (e.key === "Enter" && formula) {
    //formula = formatFormula(formula);
    let address = addressbar.value;
    let [_, cellProp] = getActiveCell(address);
    if (cellProp.formula !== formula) removeChildren(cellProp.formula);
    addChildToGraphComponent(formula, address);
    let isCyclic = isGhraphCyclic();
    if (isCyclic) {
      alert("Your formula has cycles ");
      removeChildToGraphComponent(formula, address);
      return;
    }
    let evaluatedValue = evaluateFormula(formula);

    updateCellValue(evaluatedValue, formula, address);
    addChildren(formula);
    updateChildren(address);
  }
});

function updateChildren(parentAddress) {
  let [parentCell, parentCellProp] = getActiveCell(parentAddress);
  let children = parentCellProp.children;
  for (let i = 0; i < children.length; i++) {
    let [childCell, childCellProp] = getActiveCell(children[i]);
    let childFormula = childCellProp.formula;
    let evaluatedValue = evaluateFormula(childFormula); // evaluate formula
    updateCellValue(evaluatedValue, childFormula, children[i]); // update UI and DB
    updateChildren(children[i]);
  }
}

function updateCellValue(evaluatedValue, formula, address) {
  let [cell, cellProp] = getActiveCell(address);
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
  cell.innerText = cellProp.value;
}

function evaluateFormula(formula) {
  formula = formula.split(" ");
  for (let i = 0; i < formula.length; i++) {
    if (isAlpha(formula[i][0])) {
      let [cell, cellProp] = getActiveCell(formula[i]);
      formula[i] = cellProp.value;
    }
  }
  formula = formula.join(" ");
  return eval(formula);
}

function addChildren(formula) {
  formula = formula.split(" ");
  let address = addressbar.value;
  formula.forEach((ele) => {
    if (isAlpha(ele[0])) {
      let [parentCell, parentCellProp] = getActiveCell(ele);
      parentCellProp.children.push(address);
    }
  });
}

function removeChildren(oldFormula) {
  let child = addressbar.value;
  let formulaArr = oldFormula.split(" ");
  formulaArr.forEach((ele) => {
    if (isAlpha(ele[0])) {
      let [parentCell, parentCellProp] = getActiveCell(ele);
      let childrenOfPrent = parentCellProp.children;
      childrenOfPrent.splice(childrenOfPrent.indexOf(child), 1);
    }
  });
}

function formatFormula(formula) {
  let formulaArr = formula.split(" ");
  formulaArr
    .filter((ele) => {
      return ele === "";
    })
    .reduce((acc, el) => {
      return formulaArr.splice(formulaArr.indexOf(el), "");
    }, []);

  return formulaArr.join(" ");
}

function isAlpha(ch) {
  return (
    typeof ch === "string" &&
    ch.length === 1 &&
    ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z"))
  );
}
