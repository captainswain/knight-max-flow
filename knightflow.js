function writeCellWeight(x, y, weight, context) {
    context.font = "15px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(weight, ((x * 60) - 30), ((y * 60) - 30));
}


function generateArray(){

    var arr = [...Array(10)].map(e => Array(10));

    for(var y = 0; y < 10; y++) {
        for(var x = 0; x < 10;x++) {
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