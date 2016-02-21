$(document).ready(function() {
    var canvas = document.getElementById('demo-canvas');
    var ctx = canvas.getContext("2d");
    var width = 800;
    var height = 120;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    var xmin = 15;
    var xmax = 50;
    var ymin = 1;
    var ymax = 9;
    var snake_array = [];
    for (var i = 0; i < 5; i++) {
        snake_array.push({x: xmin + i, y: ymin});
    }
    var d = "right";
    var cw = 10;
    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
    canvas.loop = game_loop

    function paint () {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        if(d == "right") nx++;
    	else if(d == "left") nx--;
    	else if(d == "up") ny--;
    	else if(d == "down") ny++;

        if (nx > xmax && ny <= ymin)
            d = "down";
        if (ny > ymax)
            d = "left";
        if (nx < xmin)
            d = "up";
        if (ny < ymin && nx < xmin)
            d = "right";

        var tail = snake_array.pop(); //pops out the last cell
        tail.x = nx; tail.y = ny;
        snake_array.unshift(tail);

        for(var i = 0; i < snake_array.length; i++)
    	{
    		var c = snake_array[i];
    		//Lets paint 10px wide cells
    		paint_cell(c.x, c.y, "black", "white");
    	}
    }

    function paint_cell(x, y, fill_color, stroke_color)
    {
        ctx.fillStyle = fill_color;
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeStyle = stroke_color;
        ctx.strokeRect(x*cw, y*cw, cw, cw);
    }

});

stopDemo = function () {
    var canvas = document.getElementById('demo-canvas');
    toggleVisibility($('#demo-canvas'));
    clearInterval(canvas.loop);
}
