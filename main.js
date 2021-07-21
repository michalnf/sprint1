'use strict';

var eltr = document.querySelector('.create-arr');

var gBoard = [];
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gLevel = { SIZE: 8, MINES: 10 };

function initGame() {
  buildBoard(gLevel.SIZE);
  minesAroundCount(gBoard);
  renderBoard(gBoard);
}

function buildBoard(num) {
  for (let i = 0; i < num; i++) {
    gBoard.push([]);
    for (let j = 0; j < num; j++) {
      gBoard[i][j] = {
        minesAroundCount: 4,
        isShown: false,
        isMine: false,
        isMarked: true,
      };
    }
  }


  for (var i = 0; i < gLevel.MINES; i++) {
    var randomMain1 = getRandomInt(0, gLevel.SIZE -1);
    var randomMain2 = getRandomInt(0, gLevel.SIZE -1);
    gBoard[randomMain1][randomMain2].isMine = true;
  }
}

function renderBoard(gBoard) {
  var strHtml = '';
  for (var i = 0; i < gBoard.length; i++) {
    strHtml += '<tr>';
    for (var j = 0; j < gBoard[0].length; j++) {
      //${gBoard[i][j].isMine} ${gBoard[i][j].minesAroundCount}
      strHtml += `<td class='cell-${i}-${j}' onclick="cellClicked(this, ${i},${j})"></td>`;
    }
    strHtml += '</tr>';
  }
  eltr.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
  gBoard[i][j].isShown = true;
  var cellMAC = gBoard[i][j].minesAroundCount;
  if (cellMAC === -1) {
    elCell.innerHTML = '💣';
    gameOver();
  }
  if (cellMAC != -1 && cellMAC > 0) {
    elCell.innerHTML = cellMAC;
  }

  if (cellMAC === 0) {
    negs(i, j, gBoard);
  }

  console.log(elCell, i, j);
  console.log('minesAroundCount', gBoard[i][j].minesAroundCount);
}

function negs(cellI, cellJ, mat) {
  if (mat[cellI][cellJ].isMine) return -1;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      var elCell = document.querySelector(`.cell-${i}-${j}`);
      if (gBoard[i][j].minesAroundCount !== 0) {
        elCell.innerHTML = gBoard[i][j].minesAroundCount;
      }

      // if (mat[i][j].isMine) {
      //     count++;
      // }
    }
  }
}

function minesAroundCount(gBoard) {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      //   console.log(gBoard[i][j]);
      var negs = blowUpNegs(i, j, gBoard);
      gBoard[i][j].minesAroundCount = negs;
    }
  }
}

function blowUpNegs(cellI, cellJ, mat) {
  var count = 0;
  if (mat[cellI][cellJ].isMine) return -1;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (mat[i][j].isMine) {
        count++;
      }
    }
  }
  return count;
}
function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
}
