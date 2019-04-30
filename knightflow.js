function writeCellWeight(x, y, weight, context) {
    context.font = "15px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(weight, ((x * 60) - 30), ((y * 60) - 30));
}
