var characters = [
    "images/char-horn-girl.png",
    "images/char-boy.png",
    "images/char-pink-girl.png",
    "images/char-horn-girl.png",
    "images/char-cat-girl.png"
]

var random = function (start, last) {
    return Math.floor(Math.random() * (last - start + 1) + start);
}

var Enemy = function (q, w) {

    this.q = q;
    this.w = w;
    this.maxSpeed = 300;
    this.minSpeed = 50;
    this.speed = random(this.maxSpeed, this.minSpeed);
    this.sprite = 'images/enemy-bug.png';
};
 
Enemy.prototype.update = function (xy) {
    this.q = this.q + this.speed * xy;

    if (this.q > 550) {
        this.speed = random(400, 100);
        this.q = -50;
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.q, this.w);
};
var Player = function (q, w) {
    this.q = q;
    this.w = w;
    this.sprite = characters[random(0, 4)];
};
var count = 0;
var HighScore = 0;
var allEnemies = [
    new Enemy(0, 63),
    new Enemy(-50, 146),
    new Enemy(-20, 229)
]
Player.prototype.update = function () {
    if (this.w < 54) {
        this.reset();
        count = count + 1

    }
    
    for (i = 0; i < allEnemies.length; i++) {
        if (((this.w - 9) == (allEnemies[i].w)) && (this.q > allEnemies[i].q - 75) && (this.q < allEnemies[i].q + 75)) {
            this.reset();
            count = 0;
        }
    }
    
    if (HighScore < count) {
        HighScore = count;
    }

    document.getElementById('count').innerHTML = "Score : " + count + " | High Score : " + HighScore;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.q, this.w);

}
Player.prototype.handleInput = function (input) {

    if (input == "left") {
        this.q -= 101;
    } else if (input == "right") {
        this.q += 101;
    } else if (input == "up") {
        this.w -= 83;
    } else if (input == "down") {
        this.w += 83;
    }
    
    //for y axis boundary check
    if (this.w < -11) {
        this.w += 83;
    }
    if (this.w > 404) {
        this.w -= 83;
    }
    // for x axis boundry check
    if (this.q > 404) {
        this.q -= 101;
    }
    if (this.q < 0) {
        this.q += 101;
    }
}
// Changes the position of the player back to the initial.
Player.prototype.reset = function () {
    this.q = 202;
    this.w = 404;
};


var player = new Player(202, 404);
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left', // left  
        38: 'up', // up    
        39: 'right', // right 
        40: 'down', // down  
        65: 'left', // left  
        68: 'right', // right
        83: 'down', // down  
        87: 'up' // up    
    };

    player.handleInput(allowedKeys[e.keyCode]);
});