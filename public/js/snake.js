startSnake = function (init) {
    var game_logic = JSON.parse(init.data);
    game_logic['canvasWidth'] = game_logic.map_array[0].length;
    game_logic['canvasHeight'] = game_logic.map_array.length;
    // console.log(game_logic['good_points'].length)
    createGame(game_logic);
};

createGame = function(game_logic){
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = game_logic['canvasWidth']* cw;
    var h = game_logic['canvasHeight']* cw;
    var good_point;
    //Lets save the cell width in a variable for easy control
    var cw = 10;
    //Canvas stuff

    console.log($('#canvas').width());
    console.log(game_logic['canvasWidth']);
    console.log($('#canvas').height());
    console.log(game_logic['canvasHeight']);
    // if (canvas.width === w && canvas.height === h)
    // {
    canvas.width = game_logic['canvasWidth']* cw;
    canvas.height = game_logic['canvasHeight'] *cw;
    // }

    // for (var ix = 0; ix < game_logic['canvasWidth']; ix++){
    //     for (var iy = 0; iy < game_logic['canvasHeight']; iy++) {
    //         paint_cell(ix, iy, "white", "black")
    //     }
    // }
    paint_board_with_image(game_logic['good_points'], game_logic['bad_points']);

    function init() {
    	    d = "right"; //default direction
    		create_snake();
    		create_food(); //Now we can see the food particle

    		//finally lets display the score
    		score = 0;

    		//Lets move the snake now using a timer which will trigger the paint function
    		//every 60ms
    		if(typeof game_loop != "undefined") clearInterval(game_loop);
    		game_loop = setInterval(paint, 60);
    }
    init();

    var d;
    var food;
    var score;

    //Lets create the snake now
    var snake_array; //an array of cells to make up the snake
    var collision_points = [];
    for (var i = 0; i < game_logic['edge_list'].length; i++) {
        collision_points.push({x:game_logic['edge_list'][i][1], y:game_logic['edge_list'][i][0]});
    }
    console.log(collision_points);
    function paint_board_with_image(open_cells, deadly_cells)
    {
        // for (var i = 0; i < open_cells.length; i++) {
        //     paint_cell(open_cells[i][1], open_cells[i][0], "blue", "white");
        // }
        for (var j = 0; j < deadly_cells.length; j++) {
            paint_cell(deadly_cells[j][1], deadly_cells[j][0], "black", "white");
        }
    }

    function create_snake()
    {
        //console.log(game_logic);
    	var length = 1; //Length of the snake
    	snake_array = []; //Empty array to start with
    	for(var i = length-1; i>=0; i--)
    	{
            good_point = game_logic['good_points'][Math.floor(Math.random()*game_logic['good_points'].length)];
    		//This will create a horizontal snake starting from the top left
    		snake_array.push({x: good_point[1], y:good_point[0]});
    	}
    }

    //Lets create the food now
    function create_food()
    {
        var good_point = game_logic['good_points'][Math.floor(Math.random()*game_logic['good_points'].length)];
    	food = {
    		x: good_point[1],
    		y: good_point[0],
    	};
    	//This will create a cell with x/y between 0-44
    	//Because there are 45(450/10) positions accross the rows and columns
    }

    //Lets paint the snake now
    function paint()
    {
    	//To avoid the snake trail we need to paint the BG on every frame
    	//Lets paint the canvas now

        copyCanvas();

        paint_board_with_image(game_logic['good_points'], game_logic['bad_points']);

    	//The movement code for the snake to come here.
    	//The logic is simple
    	//Pop out the tail cell and place it infront of the head cell
    	var nx = snake_array[0].x;
    	var ny = snake_array[0].y;
    	//These were the position of the head cell.
    	//We will increment it to get the new head position
    	//Lets add proper direction based movement now
    	if(d == "right") nx++;
    	else if(d == "left") nx--;
    	else if(d == "up") ny--;
    	else if(d == "down") ny++;

    	//Lets add the game over clauses now
    	//This will restart the game if the snake hits the wall
    	//Lets add the code for body collision
    	//Now if the head of the snake bumps into its body, the game will restart
    	if(nx <= -1 || nx >= w/cw || ny <= -1 || ny >= h/cw || check_collision(nx, ny, snake_array) || check_bad(nx, ny))
    	{
    		//restart game
    		init();
    		//Lets organize the code a bit now.
    		return;
    	}

    	//Lets write the code to make the snake eat the food
    	//The logic is simple
    	//If the new head position matches with that of the food,
    	//Create a new head instead of moving the tail
    	if(nx == food.x && ny == food.y)
    	{
    		var tail = {x: nx, y: ny};
    		score++;
    		//Create new food
    		create_food();
    	}
    	else
    	{
    		var tail = snake_array.pop(); //pops out the last cell
    		tail.x = nx; tail.y = ny;
    	}
    	//The snake can now eat the food.

    	snake_array.unshift(tail); //puts back the tail as the first cell

    	for(var i = 0; i < snake_array.length; i++)
    	{
    		var c = snake_array[i];
    		//Lets paint 10px wide cells
    		paint_cell(c.x, c.y, "white", "black");
    	}

    	//Lets paint the food
    	paint_cell(food.x, food.y, "white", "white");
    	//Lets paint the score
    	var score_text = "Score: " + score;
    	ctx.fillText(score_text, 5, h-5);
    }

    //Lets first create a generic function to paint cells
    function paint_cell(x, y, fill_color, stroke_color)
    {
    	ctx.fillStyle = fill_color;
    	ctx.fillRect(x*cw, y*cw, cw, cw);
    	ctx.strokeStyle = stroke_color;
    	ctx.strokeRect(x*cw, y*cw, cw, cw);
    }

    function check_collision(x, y, array)
    {
    	//This function will check if the provided x/y coordinates exist
    	//in an array of cells or not

    	for(var i = 0; i < array.length; i++)
    	{
    		if(array[i].x == x && array[i].y == y)
    		 return true;
    	}
    	return false;
    }

    function check_bad(x, y)
    {
        //This function will check if the provided x/y coordinates exist
        //in an array of cells or not
        return game_logic['map_array'][y][x] == 1
    }

    //Lets add the keyboard controls now
    $(document).keydown(function(e){
    	var key = e.which;
    	//We will add another clause to prevent reverse gear
    	if(key == "37" && d != "right") d = "left";
    	else if(key == "38" && d != "down") d = "up";
    	else if(key == "39" && d != "left") d = "right";
    	else if(key == "40" && d != "up") d = "down";
    	//The snake is now keyboard controllable
    })
};

copyCanvas = function() {
    var canvasOne = document.getElementById('photoCanvas');
    var canvasTwo = document.getElementById('canvas');
    canvasTwo.width = canvasOne.width;
    canvasTwo.height = canvasOne.height;
    canvasTwo.getContext('2d').drawImage(canvasOne, 0, 0, canvasOne.width, canvasOne.height)
}
