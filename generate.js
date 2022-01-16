const {point} = require("./point.js");
const {randomInt} = require("./helperFunctions.js");
const boardFunctions = require("./boardFunctions");


function newBoardGreedy(n) {
  let boardList = [];
  for (let i=0;i<n;++i) {
    boardList.push(0);
  }
  for (let i=0;i<n;++i) {
    boardFunctions.placeQueenOnBoard(
        boardList,
        new point (
            i,
            boardFunctions.selectQueenRowFromConflictList(
            boardFunctions.generateColumnConflictList(
                boardList,
                i))));
  }
  return boardList;
}

function newBoardRandom(n) {
  let boardList = [];
  for (let i=0;i<n;++i){
    boardFunctions.placeQueenOnBoard(
        boardList,
        new point(
            i,
            randomInt(n)));
  }
  return boardList;
}

exports.newBoardGreedy = newBoardGreedy;
exports.newBoardRandom = newBoardRandom;
