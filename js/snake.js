/**
 * 基本步骤：
 * 1. 创建画布
 * 2. 游戏初始化
 * 3. 绘制蛇
 * 4. 键盘事件移动蛇
 * 5. 绘制食物
 * 6. 判断蛇吃食物
 * 7. 判断蛇是否撞墙或撞自己
 */

var cvs = document.getElementById("cvs")
var ctx = cvs.getContext("2d")

cvs.height = 600
cvs.width = 800

var snakeSize = 20
var cvsGirdX = cvs.width / snakeSize
var cvsGirdY = cvs.height / snakeSize
var length = 0
var snakeBody = []
var dire = 2 //移动方向
var food = {}

function init() {
    snakeBody = []
    length = 0
    dire = 2
    for (var i = 0; i < 3; i++) {
        createSnakeNode(parseInt(cvsGirdX / 2) + i, parseInt(cvsGirdY / 2))
    }
    drawSnake()
    putFood()
}

function createSnakeNode(x, y) {
    snakeBody.push({ x: x, y: y, color: length == 0 ? '#f00' : '#000' })
    length++
}

function drawSnake() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (var i = 0; i < snakeBody.length; i++) {
        drawRect(snakeBody[i])
    }
    drawRect(food)
}

function drawRect(snakeNode) {
    ctx.beginPath()
    ctx.fillStyle = snakeNode.color
    ctx.fillRect(snakeNode.x * snakeSize, snakeNode.y * snakeSize, snakeSize, snakeSize)
    ctx.closePath()
}

// 蛇移动
function snakeMove() {
    var newSnakeHead = { x: snakeBody[0].x, y: snakeBody[0].y, color: snakeBody[0].color }

    if (dire === 1) newSnakeHead.y -= 1
    if (dire === -1) newSnakeHead.y += 1
    if (dire === 2) newSnakeHead.x -= 1
    if (dire === -2) newSnakeHead.x += 1

    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].x = snakeBody[i - 1].x
        snakeBody[i].y = snakeBody[i - 1].y

        if (snakeBody[i].x === newSnakeHead.x && snakeBody[i].y === newSnakeHead.y) {
            gameOver()
            return false
        }
    }
    snakeBody[0] = newSnakeHead

    isGetFood(snakeBody[0])
    isCheckoutBorder(snakeBody[0])
}

function isGetFood(snakeHead) {
    if (food.x === snakeHead.x && food.y === snakeHead.y) {
        putFood();
        snakeBody.push({ x: snakeBody[snakeBody.length - 1], y: snakeBody[snakeBody.length - 1], color: '#000' })
    }
}

function isCheckoutBorder(snakeHead) {
    if (snakeHead.x < 0 || snakeHead.x > cvsGirdX - 1 || snakeHead.y < 0 || snakeHead.y > cvsGirdY - 1) {
        gameOver()
    }
}

function gameOver() {
    console.error('游戏结束')
    init()
}

function setDirection(dir) {
    // 避免在按相同方向或相反方向的问题
    if (Math.abs(dir) === Math.abs(dire)) return;
    dire = dir
}

// 绘制食物
function putFood() {
    var flag = 1
    while (1) {
        flag = 1
        var foodX = parseInt(Math.random() * cvsGirdX)
        var foodY = parseInt(Math.random() * cvsGirdY)

        for (var i = 0; i < snakeBody.length; i++) {
            if (foodX === snakeBody[i].x && foodY === snakeBody[i].y) flag = 0
        }
        if (flag) break;
    }
    food = { x: foodX, y: foodY, color: 'yellow' }
}

// 监听键盘方向 
document.onkeydown = function(e) {
    e.preventDefault()
    if (e.keyCode == 38) setDirection(1) //上
    if (e.keyCode == 40) setDirection(-1) //下
    if (e.keyCode == 37) setDirection(2) //左
    if (e.keyCode == 39) setDirection(-2) //右
    console.log(...snakeBody)
}


init();
setInterval(function() {
    snakeMove()
    drawSnake()
}, 100)