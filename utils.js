function createArr(size){
    var arr=[]
    for(var j=0; j < size ; j++){
      arr.push(j)
    }
    return arr;
  }
  

function drawNum(numsArr) {
  var randIdx = getRandomInt(0, numsArr.length);
  var num = numsArr[randIdx];
  numsArr.splice(randIdx, 1);
  return num;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

setTimeout(getRandomColor, 3000);
// parem1 = שם של פונקציה
//param2 = שניות האינטרוול
var inter = setInterval(getRandomColor, 1000);
clearInterval(inter);

var timeStart;
var ginterval;
var timerP = document.querySelector('#dfdd');

function getTime() {
    timeStart = Date.now();
    ginterval = setInterval(renderTime, 10);
  }
  
  function renderTime() {
    var msTimeDiff = Date.now() - timeStart;
    var timeDiffStr = new Date(msTimeDiff).toISOString().slice(17, -1);
    timerP.innerText = timeDiffStr;
  }
  
