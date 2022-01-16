const helperFunctions = require("./helperFunctions.js");
const {binaryNode} = require("./binaryNode.js");
const {point,computeSlope,computeYIntercept} = require("./point.js");
const {slopeInterceptObject} = require("./slopeInterceptObject.js");

function placeQueenOnBoard(boardList, location) {
  return boardList[location.x] = location.y;
}


// select the row to put a queen in from a list of point conflicts in an entire row
// O(n)
function selectQueenRowFromConflictList (conflictList) {
  let listOfMins = [];
  // the conflicts list will be of size n
  // so we can safely assume that the minimum number of conflicts will be less than 3 times n
  // since at most a point can conflict with another in 3 ways
  let min = (conflictList.length*3)+1;
  for (let i=0;i<conflictList.length;++i) {
    if (conflictList[i] < min) {
      listOfMins = [i];
      min = conflictList[i];
    } else if (conflictList[i] === min) {
      listOfMins.push(i);
    }
  }
  let myRandom = helperFunctions.randomInt(listOfMins.length)
  if (listOfMins.length < 1) {
    throw "did not find a minimum"
  }
  return listOfMins[myRandom];
}


// count conflicts for each point in column
// (n*n-1)/2 + (n*n-1)/2 + (n*n-1)/2 + n^2
function generateConflictCountForEachPointInColumn(boardList, column) {
  let combinationList = generateAllCombinations(boardList);
  let revisedCombinationList = removeWorkingColumnFromCombinationList(combinationList, column);
  let [slopeTree, count] = generateSlopeTree(revisedCombinationList);
  let conflictList = [];
  for (let row=0;row<boardList.length;++row) {
    let queenLocation = new point(column, row);
    conflictList[row] = countSinglePointConflicts(boardList, slopeTree, queenLocation);
  }
  return conflictList;
}

// count the conflicts for the whole board
// (n*n-1)/2
function countWholeBoardConflictsv1(boardList, slopeTree, slopeTreeCount) {
  let combinationList = generateAllCombinations(boardList);
  let count = slopeTreeCount;
  for (let item=0;item<combinationList.length;++item) {
    let [pointA, pointB] = combinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if ( slopeIntercept.slope === 1 || slopeIntercept.slope === -1 ) {
      ++count;
    } else if ( slopeIntercept.slope === 0 ) {
      ++count;
    }
  }
  return count;
}
// count the conflicts for the whole board
// (n*n-1)/2
function countWholeBoardConflicts(boardList, slopeTree, slopeTreeCount, allCombinationsList) {
  let count = slopeTreeCount;
  for (let item=0;item<allCombinationList.length;++item) {
    let [pointA, pointB] = allCombinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if ( slopeIntercept.slope === 1 || slopeIntercept.slope === -1 ) {
      ++count;
    } else if ( slopeIntercept.slope === 0 ) {
      ++count;
    }
  }
  return count;
}

// count conflicts compared to passed in point, ie how many conflicts a single point has
// n + (n * log(n))
function countSinglePointConflicts(boardList, slopeTree, queenLocation) {
  let combinationList = generateSinglePointCombinations(boardList, queenLocation);
  let count = 0;
  for (let item=0;item<combinationList.length;++item) {
    let [pointA, pointB] = combinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if ( slopeIntercept.slope === 1 || slopeIntercept.slope === -1 ) {
      ++count;
    } else if ( slopeIntercept.slope === 0 ) {
      ++count;
    } else {
      if (slopeTree.find(slopeIntercept)) {
        ++count;
      }
    }
  }
  return count;
}

// generates tree that is used to find conflicts sorted via slope/yintercept
// O((n*n-1)/2) * log n
function generateSlopeTree(combinationList) {
  let tree = new binaryNode();
  let count = 0;
  let pointA = new point(0, 0);
  let pointB = new point(0, 0);
  for (let item=0;item<combinationList.length;++item) {
    [pointA, pointB] = combinationList[item];
    let slopeIntercept = new slopeInterceptObject(
        computeSlope(pointA, pointB),
        computeYIntercept(pointA, pointB));
    if (slopeIntercept == null ) {
      console.log("slopeIntercept was null");
    }
    if (tree.add(slopeIntercept) === true ) {
      count++;
    }
  }
  return [tree, count];
}

// generate every combination for every point on the board will return an array (n*n-1)/2 large
// O((n*n-1)/2)
function generateAllCombinations(boardList) {
  let combinationList = [];
  for (let i=0;i<boardList.length;++i) {
    for (let j=i+1;j<boardList.length;++j) {
      let pointA = new point(i, boardList[i]);
      let pointB = new point(j, boardList[j]);
      combinationList.push([pointA, pointB]);
    }
  }
  return combinationList;
}

// generate the combination of one point with every other point, returns a combination list of size n-1
// O(n)
function generateSinglePointCombinations(boardList, comparePoint) {
  let combinationList = [];
  for (let i=0;i<boardList.length;++i) {
    let listPoint = new point(i, boardList[i]);
    if (comparePoint.x != listPoint.x) {
      combinationList.push([comparePoint, listPoint]);
    }
  }
  return combinationList
}


//removes a column from a combination list, resulting in the removal of n-1 items from the combination list
// O((n*n-1)/2)
function removeWorkingColumnFromCombinationList(combinationList, column) {
  return combinationList.filter((item) => { 
    let [pointA, pointB] = item;
    if (pointA.x === column || pointB.x === column) {
      return false;
    }
    return true;
  });
}
exports.placeQueenOnBoard = placeQueenOnBoard;
exports.selectQueenRowFromConflictList = selectQueenRowFromConflictList;
exports.generateConflictCountForEachPointInColumn = generateConflictCountForEachPointInColumn;
exports.removeWorkingColumnFromCombinationList = removeWorkingColumnFromCombinationList;
exports.generateAllCombinations = generateAllCombinations;
exports.generateSlopeTree = generateSlopeTree;
exports.countWholeBoardConflicts = countWholeBoardConflicts;
exports.countWholeBoardConflictsv1 = countWholeBoardConflictsv1;
