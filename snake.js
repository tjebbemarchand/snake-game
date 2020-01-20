const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Box size.
const box = 32;

// Load images.
const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Create snake.
const snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Create food.
const food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// Score.
let score = 0;

// Control snake.
let direction = null;

function moveDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIFHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

// Draw to canvas.
function draw() {
    // Draw ground image.
    context.drawImage(groundImg, 0, 0);

    // Draw snake.
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? "green" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeSyle = "red";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food.
    context.drawImage(foodImg, food.x, food.y);

    // Old head position.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Determine direction.
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // If snake eats food.
    if (snakeX === food.x && snake.y === snakeY) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };

        // We don't remove the tail.
    } else {
        // Remove tail.
        snake.pop();
    }

    // Add new head.
    let newHead = {
        x: snakeX,
        Y: snakeY
    };

    snake.unshift(newHead);

    // Draw score.
    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score, 2 * box, 1.6 * box);
}

// Draw every 100ms
let game = setInterval(draw, 500);

// Listen for keyboard events.
document.addEventListener("keydown", moveDirection);
