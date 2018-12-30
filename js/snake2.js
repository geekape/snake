var cvs = document.getElementById("cvs")
var ctx = cvs.getContext("2d")

cvs.height = parseInt(document.documentElement.clientHeight)
cvs.width = parseInt(document.documentElement.clientWidth)


var snakeSize = 20,
		cvsGirdX = parseInt(cvs.width / snakeSize),
		cvsGirdY = parseInt(cvs.height / snakeSize),
		snakeBody = [],
		snakeColor = '#009688',
		snakeHeadColor = '#003f39',
		length = 0,
		dire = 2,
		score = 0,
		food = {};
		
function init() {
	snakeBody = []
	length = 0
	dire = 2
	score = 0
	for(var i=0; i<3; i++) {
		createSnakeNode(cvsGirdX/2+i, cvsGirdY/2)
	}
	drawSnake()
	putFood()
	
}

function createSnakeNode(x,y) {

	snakeBody.push({ x: x, y: y, color: length == 0 ? snakeHeadColor : snakeColor })
	length++
}

function drawSnake() {
	ctx.clearRect(0,0,cvs.width,cvs.height)
	for(var i=0;i<snakeBody.length;i++) {
		drawRect(snakeBody[i])
	}
	drawRect(food)
	drawScore()
}

function drawRect(snakeNode) {
	ctx.beginPath()
	ctx.fillStyle = snakeNode.color
	ctx.fillRect(snakeNode.x*snakeSize,snakeNode.y*snakeSize, snakeSize, snakeSize)
	ctx.closePath()
}

function snakeMove() {
	// 是否撞自己
	var newSnakeHead = { x: snakeBody[0].x, y: snakeBody[0].y, color: snakeBody[0].color }
	if(dire === 1) newSnakeHead.y -= 1
	if(dire === -1) newSnakeHead.y += 1
	if(dire === 2) newSnakeHead.x -= 1
	if(dire === -2) newSnakeHead.x += 1
	
	
	for(var i=snakeBody.length-1;i>0;i--) {
		snakeBody[i].x = snakeBody[i-1].x;
		snakeBody[i].y = snakeBody[i-1].y;
		
		if (snakeBody[i].x === newSnakeHead.x && snakeBody[i].y === newSnakeHead.y) {
		    gameOver()
		    return false
		}
	}
	snakeBody[0] = newSnakeHead
// 	console.log('X轴',snakeBody[0].x,snakeBody[1].x,snakeBody[2].x)
// 	console.log('Y轴',snakeBody[0].y,snakeBody[1].y,snakeBody[2].y)
// 	console.log('dire为',dire)
	isGetFood(snakeBody[0])
	isCheckoutBorder(snakeBody[0])
}

function setDirection(dir) {
	if(Math.abs(dir) == Math.abs(dire)) return;
	dire = dir
}

// 食物
function putFood() {
	var flag = 1
	while(flag) {
		var foodX = parseInt(Math.random() * cvsGirdX)
		var foodY = parseInt(Math.random() * cvsGirdY)
		
		for(var i=0;i<snakeBody.length;i++) {
			if(foodX === snakeBody[i].x && foodY === snakeBody[i].y) flang=0
		}
		if(flag) break;
	}
	
	food = {x: foodX, y: foodY, color: 'yellow'}
}

function isGetFood(snakeHead) {
	if(food.x === snakeHead.x && food.y === snakeHead.y) {
		putFood()
		score++
		
		// ???
		snakeBody.push({x: snakeBody[snakeBody.length-1], y:snakeBody[snakeBody.length-1], color: snakeColor})
	}
}

function isCheckoutBorder(snakeHead) {
	if(snakeHead.x > cvsGirdX-1 || snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.y > cvsGirdY-1) {
		gameOver()
	}
}

function gameOver() {
	console.error('游戏结束')
	init()
}

function drawScore() {
	ctx.font = "16px serif"
	ctx.fillStyle = "red"
	ctx.fillText('得分：'+score, parseInt(cvs.width-100), 50);
}


document.onkeydown = function(e) {
    e.preventDefault()
    if (e.keyCode == 38) setDirection(1) //上
    if (e.keyCode == 40) setDirection(-1) //下
    if (e.keyCode == 37) setDirection(2) //左
    if (e.keyCode == 39) setDirection(-2) //右
}

init();

setInterval(function() {
	// 向左
	// snakeBody [15,30]/[16/30]/[17/30]
	// snakeBody [14,30]/[15/30]/[16/30]
	// snakeBody [13,30]/[14/30]/[15/30]
	snakeMove()
	drawSnake()
	
}, 100)



