function Snake() {
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
		foodCount = 1,
		food = {};

	this.init = function() {
		snakeBody = []
		length = 0
		dire = 2
		score = 0
		for (var i = 0; i < 3; i++) {
			this.createNode(cvsGirdX / 2 + i, cvsGirdY / 2)
		}
		this.draw()
		this.putFood()




	}

	this.createNode = function(x, y) {
		snakeBody.push({
			x: parseInt(x),
			y: parseInt(y),
			color: length == 0 ? snakeHeadColor : snakeColor
		})
		length++
	}

	this.draw = function() {
		ctx.clearRect(0, 0, cvs.width, cvs.height)
		for (var i = 0; i < snakeBody.length; i++) {
			this.drawRect(snakeBody[i])
		}
		this.drawRect(food)
		this.drawScore()
	}

	this.drawRect = function(snakeNode) {
		ctx.beginPath()
		ctx.fillStyle = snakeNode.color
		ctx.fillRect(snakeNode.x * snakeSize, snakeNode.y * snakeSize, snakeSize, snakeSize)
		ctx.closePath()
	}

	this.setDirection = function(dir) {
		if (Math.abs(dir) == Math.abs(dire)) return;
		dire = dir
	}

	this.move = function() {
		// 是否撞自己
		var newSnakeHead = {
			x: snakeBody[0].x,
			y: snakeBody[0].y,
			color: snakeBody[0].color
		}
		if (dire === 1) newSnakeHead.y -= 1
		if (dire === -1) newSnakeHead.y += 1
		if (dire === 2) newSnakeHead.x -= 1
		if (dire === -2) newSnakeHead.x += 1


		for (var i = snakeBody.length - 1; i > 0; i--) {
			snakeBody[i].x = snakeBody[i - 1].x;
			snakeBody[i].y = snakeBody[i - 1].y;

			if (snakeBody[i].x === newSnakeHead.x && snakeBody[i].y === newSnakeHead.y) {
				this.gameOver()
				return false
			}
		}
		snakeBody[0] = newSnakeHead
		// 	console.log('X轴',snakeBody[0].x,snakeBody[1].x,snakeBody[2].x)
		// 	console.log('Y轴',snakeBody[0].y,snakeBody[1].y,snakeBody[2].y)
		// 	console.log('dire为',dire)
		this.isGetFood(snakeBody[0])
		this.isCheckoutBorder(snakeBody[0])
	}

	this.putFood = function() {
		var flag = 1
		while (flag) {
			var foodX = parseInt(Math.random() * cvsGirdX)
			var foodY = parseInt(Math.random() * cvsGirdY)

			for (var i = 0; i < snakeBody.length; i++) {
				if (foodX === snakeBody[i].x && foodY === snakeBody[i].y) flang = 0
			}
			if (flag) break;
		}

		food = {
			x: foodX,
			y: foodY,
			color: 'yellow'
		}
	}

	this.isGetFood = function(snakeHead) {
		if (food.x === snakeHead.x && food.y === snakeHead.y) {
			score++
			for (var i = 0; i < foodCount; i++) {
				console.log('生成第' + i + '个食物')
				this.putFood()
			}
			foodCount++

			// ???
			snakeBody.push({
				x: snakeBody[snakeBody.length - 1],
				y: snakeBody[snakeBody.length - 1],
				color: snakeColor
			})
		}
	}

	this.isCheckoutBorder = function(snakeHead) {
		if (snakeHead.x > cvsGirdX - 1 || snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.y > cvsGirdY - 1) {
			this.gameOver()
		}
	}

	this.gameOver = function() {
		console.error('游戏结束')
		this.init()
	}

	this.drawScore = function() {
		ctx.font = "16px serif"
		ctx.fillStyle = "red"
		ctx.fillText('得分：' + score, parseInt(cvs.width - 100), 50);
	}

}
var snake = new Snake()
snake.init()
document.onkeydown = function(e) {
	e.preventDefault()
	if (e.keyCode == 38) snake.setDirection(1) //上
	if (e.keyCode == 40) snake.setDirection(-1) //下
	if (e.keyCode == 37) snake.setDirection(2) //左
	if (e.keyCode == 39) snake.setDirection(-2) //右
}
setInterval(function() {
	// 向左
	// snakeBody [15,30]/[16/30]/[17/30]
	// snakeBody [14,30]/[15/30]/[16/30]
	// snakeBody [13,30]/[14/30]/[15/30]
	snake.move()
	snake.draw()

}, 100)
