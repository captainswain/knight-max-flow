
function drawBoard(context) {
    for (var i = 0; i <= 600; i = i + 60) {
        context.moveTo(i, 0);
        context.lineTo(i, 600);
        context.moveTo(0, i);
        context.lineTo(600, i);
        context.stroke();
    }
}

function writeCellWeight(x, y, weight, context) {
    context.font = "15px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(weight, ((x * 60) - 30), ((y * 60) - 30));
}


function generateMatrix(){

    var arr = [...Array(10)].map(e => Array(10)); 
         
    for(var y = 0; y < 10; y++) {     
    for(var x = 0; x < 10;x++)  {         
        randomEvenInt = Math.floor(Math.random() * 15)*2;               
        arr[x][y] = randomEvenInt;     
    }
}
console.log(arr);
    return arr;
}

function printValues(array, context){
    for(var y = 0; y < 10; y++) {
        for(var x = 0; x < 10; x++) {
            writeCellWeight(y+1, x+1, array[x][y], context);
        }
    }
}


function findNextMoves(x,y, matrix){
    // All possible knight moves from currentposition
    var possible_moves = [[2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]];
    var valid_moves = [];



}