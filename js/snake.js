
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
       this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
function init()
{
	var canvas=document.getElementById("mycanvas");
	W=H=canvas.width=canvas.height=1000;
	pen=canvas.getContext('2d');
	cs=67;
	stop=false;
	score=5;
	 eat = new sound("assets/eatfruit.mp3");
	 move = new sound("assets/movement.mp3");
	 game_over = new sound("assets/gameover.mp3");
	food_img=new Image();
	food_img.src="assets/apple.png"
	trophy=new Image();
	trophy.src="assets/tropy.png"
	food=getfood();
	snake={
		initiallen:5,
		color:"#206a5d",

		cells:[],
		direction:"right",
		createSnake: function()
		{
			for(var i=this.initiallen;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function()
		{
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillStyle=this.color;
			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
		    }
		},
		updateSnake:function()
		{
			console.log("Snake array if getting updated");
			var headX=this.cells[0].x;
			 var headY=this.cells[0].y;
			 if(headX==food.x && headY==food.y)
			 {
			 	eat.play();
			 	food=getfood();

			 	score++;

			 }
			 else
			   {
			    this.cells.pop();
				}
			 
			 var X,Y;
			 if(this.direction=="left")
			 {
			 	X=headX-1;
			 	Y=headY;
			 }
			 else
			 	if(this.direction=="right")
			 {
			 	X=headX+1;
			 	Y=headY;
			 }
			 else
			 if(this.direction=="up")
			 {
			 	X=headX;
			 	Y=headY-1;
			 }
			 else
			 {
			 	X=headX;
			 	Y=headY+1;
			 }

			 this.cells.unshift({x:X,y:Y});
			 var lstx=Math.round(W/cs);
			 var lsty=Math.round(H/cs);
			 if(this.cells[0].x<0 || this.cells[0].y<0|| this.cells[0].x>=lstx ||this.cells[0].y>=lsty)
			 	stop=true;

		}


	};
	snake.createSnake();
	function keypressed(e)
	{
		   move.play();
			if(e.key=="ArrowUp" || e.key=="w" || e.key=="W")
			{
				if(snake.direction!="down")
				snake.direction="up";
			}
			else
				if(e.key=="ArrowDown"|| e.key=="s" || e.key=="S")
					{
						if(snake.direction!="up")
						snake.direction="down";
					}
			else
				if(e.key=="ArrowRight"|| e.key=="d" || e.key=="D")
				{
					if(snake.direction!="left")
					snake.direction="right";
				}
			else
				if(e.key=="ArrowLeft"|| e.key=="a" || e.key=="A")
				{
					if(snake.direction!="right")
					snake.direction="left";
				}
	}
	document.addEventListener('keydown',keypressed);
	
}
function draw()
{

	    //erasing old frame

	    pen.clearRect(0,0,W,H);
		snake.drawSnake();
		pen.fillStyle=food.color;
		pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
		pen.drawImage(trophy,20,20,cs,cs)
		pen.fillStyle="#206a5d";
		pen.font="20px Roboto";
		pen.fillText(score,50,50);
	

}
function getfood()
{
	var foodx=Math.round(Math.random()*(W-cs)/cs);
	var foody=Math.round(Math.random()*(H-cs)/cs);
	var food={
		x:foodx,
		y:foody,
		//color:"red",
	}
	return  food;
}
function update()
{
	

	snake.updateSnake();


}
function gameloop()
{
	if(stop==true)
	{
		game_over.play();
		clearInterval(f);
		alert("GAME OVER!!TRY AGAIN")
		window.location.reload(); 
	}
	draw();
	update();
	
}

init();
var f=setInterval(gameloop,180);


