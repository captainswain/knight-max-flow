
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
    context.fillText(weight, (((x+1) * 60) - 30), (((y+1) * 60) - 30));
}

function drawCellLine(x1,y1, x2, y2, context){
    context.beginPath();
    context.moveTo(((x1+1) * 60) - 27, ((y1+1) * 60) - 27);
    context.lineTo(((x2+1) * 60) - 27, ((y2+1) * 60) - 27);
    context.stroke();
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
            writeCellWeight(y, x, array[x][y], context);
        }
    }
}

function findNextMoves(x,y, matrix, visitedMatrix){
    // All possible knight moves from currentposition
    var possible_moves = [[2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1]];
    var valid_moves = [];

    for (var i = 0; i < 8; i++){
        var new_x = x + possible_moves[i][0];
        var new_y = y + possible_moves[i][1];

        if ( (new_x > 0 && new_y > 0 ) && (new_x < 10) && (new_y < 10) && typeof matrix[new_y][new_x] !== 'undefined' && !visitedMatrix[new_y][new_x]){
            console.log("This move exists! x=" + new_x + " y = " + new_y);
            console.log(matrix[new_y][new_x]);
            valid_moves.push([new_x , new_y, matrix[new_y][new_x]]);
        }
    
    
    }
    console.log(valid_moves);
    return valid_moves;

}


function moveToBestFit(x,y, valid_moves, matrix){


    var bestCapacity = 0;
    var nextMoveCapacity = 0;
    var bestIndex = 0;

    // Positions where next move is sink.
    var goodPostions = [[9,9], [7,9], [6,8], [6,6], [7,5], [9,5]];

    for (var i= 0; i < valid_moves.length; i++){
        // first prefer largest capacity
        if (valid_moves[i][2] > bestCapacity && nextMoveCapacity == 0){
            bestCapacity = valid_moves[i][2];
            bestIndex = i;
        }
        // If sink is possible move then choose sink
        if (valid_moves[i][0] == 8 && valid_moves[i][1] == 7){
            console.log("found best move in movetobestfit");
            bestCapacity = valid_moves[i][2];
            bestIndex = i;
            break;
        }

        for (var j= 0; j < goodPostions.length; j++){
            if (valid_moves[i][0] == goodPostions[j][0] && valid_moves[i][1] == goodPostions[j][1]){
                console.log("found good move");
                if (nextMoveCapacity < valid_moves[i][2] ){
                    bestCapacity = valid_moves[i][2];
                    nextMoveCapacity = valid_moves[i][2];
                    bestIndex = i;
                }
            }
        }
    }
    drawCellLine(x, y, valid_moves[bestIndex][0], valid_moves[bestIndex][1], context);

    return [valid_moves[bestIndex][0], valid_moves[bestIndex][1]]

}



function findMaxFlow(matrix, context){
    // Testing
    var current_x = 1;
    var current_y = 2;
    var visitedMatrix = Array(10).fill().map(() => Array(10).fill(false));
    var max_moves =  Math.random() * (30 - 15) + 15;
    var move_count = 0;

    // Set source as visited
    visitedMatrix[2][1] = true;

    while(current_x !== 8 || current_y !== 7){
        if(move_count < max_moves){
            var MovesFromSource = findNextMoves(current_x, current_y, matrix, visitedMatrix);
            new_positions = moveToBestFit(current_x, current_y, MovesFromSource, matrix);
            current_x = new_positions[0];
            current_y = new_positions[1];
            visitedMatrix[current_y][current_x] = true;  
            move_count++;
        }else{
            console.log("max moves exceeded retrying...");
            break;
            // context.clearRect(0, 0, 600, 600);
            // current_x = 1;
            // current_y = 2;
            // var MovesFromSource = findNextMoves(current_x, current_y, matrix, visitedMatrix);
            // new_positions = moveToBestFit(current_x, current_y, MovesFromSource, matrix);
            // current_x = new_positions[0];
            // current_y = new_positions[1];
            // visitedMatrix[current_y][current_x] = true;  
        }
    }   

    console.log("Found the sink! current x=" + current_x + " current y=" + current_y);
}