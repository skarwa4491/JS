let graphComponentMatrix = []; // 2d Matrix for an array

// prepare storage for graph
for (let i = 0; i < rows; i++) {
  let row = new Array();
  for (let j = 0; j < cols; j++) {
    // Array to store more than one children
    row.push(new Array());
  }
  graphComponentMatrix.push(row);
}

function addChildToGraphComponent(formula, childAddres) {
  let [crid, ccid] = decodeAddress(childAddres);
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    if (isAlpha(encodedFormula[i][0])) {
      let [prid, pcid] = decodeAddress(encodedFormula[i]);
      graphComponentMatrix[prid][pcid].push([crid, ccid]);
    }
  }
}

function removeChildToGraphComponent(formula, address) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    if (isAlpha(encodedFormula[i][0])) {
      let [prid, pcid] = decodeAddress(encodedFormula[i]);
      graphComponentMatrix[prid][pcid].pop();
    }
  }
}

// returns a boolean value true -> cycle is present , and false -> not cycle
function isGhraphCyclic() {
  let visited = [];
  let DFSVisited = [];

  for (let i = 0; i < rows; i++) {
    let visitedRow = new Array();
    let DFSVisitedRow = new Array();
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      DFSVisitedRow.push(false);
    }
    visited.push(visitedRow);
    DFSVisited.push(DFSVisitedRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === false) {
        return detectCycle(graphComponentMatrix, i, j, visited, DFSVisited);
      }
    }
  }
  return false;
}

/**
 * Start:
 * DFS -> true
 * visited -> true
 *
 * END :
 * DFSVisited -> false
 *
 * condition :
 * if(visited && DFSVisisted){
 *  cycle detected
 * }
 *
 */

function detectCycle(graphComponentMatrix, i, j, visited, DFSVisited) {
  visited[i][j] = true;
  DFSVisited[i][j] = true;
  let currentPath = graphComponentMatrix[i][j];
  for (let i = 0; i < currentPath.length; i++) {
    let [crid, ccid] = currentPath[i];
    if (visited[crid][ccid] === false) {
      let response = detectCycle(
        graphComponentMatrix,
        crid,
        ccid,
        visited,
        DFSVisited
      );
      if (response === true) return true;
    } else if (DFSVisited[crid][ccid] === true) return true;
  }

  DFSVisited[i][j] = false;
  return false;
}
