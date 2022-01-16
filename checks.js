const boardFunctions = require("./boardFunctions.js");
const {point} = require("./point.js");


function isValidBoard(boardList) {
  if (countTotalBoardConflicts(boardList) === 0 ) {
    return true;
  } else {
    return false;
  }
}

function countTotalBoardConflicts(boardList) {
  let allCombinations = boardFunctions.generateAllCombinations(boardList);
  let [slopeTree, count] = boardFunctions.generateSlopeTree(allCombinations);
  count = boardFunctions.countWholeBoardConflictsv1(
        boardList,
        slopeTree,
        count,
        allCombinations);
  return count;
}


exports.isValidBoard = isValidBoard;
exports.countTotalBoardConflicts = countTotalBoardConflicts;
