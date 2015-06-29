var socket = io();
var clickedCells=[];

  function setup(){
    window.table = document.getElementById("bingo");
    window.hiLightCount = 0;
    var data = 'data';
    var rowLength = table.getElementsByTagName('tr').length;
    // Send init event to Socket.io server
    if(rowLength === 0)socket.emit('init');
    }  

  // Initialize table of(buzzwords members
  socket.on('init', function(buzzwords){

    for(var i = 0; i< 5; i++){
      var row = table.insertRow(-1);
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();
      var cell4 = row.insertCell();
      var cell5 = row.insertCell();
      cell1.innerHTML = (buzzwords.pop());
      cell2.innerHTML = (buzzwords.pop());
      if(i === 2)cell3.innerHTML = ("FREE");
      else cell3.innerHTML = (buzzwords.pop());
      cell4.innerHTML = (buzzwords.pop());
      cell5.innerHTML = (buzzwords.pop());
  }
  //color free space and add to clickedCells
  table.rows[2].cells[2].style.backgroundColor = "#FFFF00";
  clickedCells.push("33");
  clickSelect();
  });

function clickSelect(){
  var tbl = document.getElementById("bingo");
  if (tbl != null) {
      for (var i = 0; i < tbl.rows.length; i++) {
          for (var j = 0; j < tbl.rows[i].cells.length; j++)
              tbl.rows[i].cells[j].onclick = function () {
                var index = (String(this.cellIndex+1) + String(this.parentNode.rowIndex+1));
                this.style.backgroundColor = this.style.backgroundColor ? "" : "#FFFF00";
                if(clickedCells.indexOf(index) > -1){
                  //cell is unclicked, remove from array
                  for (var i=clickedCells.length-1; i>=0; i--) {
                    if (clickedCells[i] === index) {
                        clickedCells.splice(i, 1);
                        break;
                    }
                  }
                }
                else{
                  clickedCells.push(index);
                  //check if won
                  isBingo();


                }
               };
      }
  } 

}

function isBingo(){
var winningCase = [[11,12,13,14,15],[21,22,23,24,25],[31,32,33,34,35],[41,42,43,44,45],[51,52,53,54,55],
                   [11,21,31,41,51],[12,22,32,42,52],[13,23,33,43,53],[14,24,34,44,54],[15,25,35,45,55],
                   [11,22,33,44,55],[51,42,33,24,15],[11,51,15,55] ];
for(var z=0; z < winningCase.length; z++){
  a = checkEndCase(clickedCells,winningCase[z]);
  if(a === true){
    alert("BINGO");
    break;
  }
}
}

function checkEndCase(sup,winningCase){
    sup.sort();
    winningCase.sort();
    var i, j;
    for (i=0,j=0; i<sup.length && j<winningCase.length;) {
        if (sup[i] < winningCase[j]) {
            ++i;
        } else if (sup[i] == winningCase[j]) {
            ++i; ++j;
        } else {
            // sub[j] not in sup, so sub not subbag
            return false;
        }
    }
    // make sure there are no elements left in sub
    return (j == winningCase.length);
}
