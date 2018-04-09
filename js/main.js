var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var countOfPlanets = document.getElementById("countOfPlanets");
var colorOfPoint = document.getElementById("colorOfPoint");
var sizeOfPoint = document.getElementById("sizeOfPoint");
var countOfPoint = document.getElementById("speedOfPoint");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
//parseInt(window.innerWidth * Math.random(), 10);
//parseInt(window.innerHeight * Math.random(), 10);

var points = [];
var planets = [];
var massPoint = 1;

var planet = {
    double : "m",
    int : "x",
    int : "y",
}

var vector = {
    int : x = 0,
    int : y = 1,
    double : angle = Math.atan(x / y),
}

function createPoint(x, y){
    let point = {
        int : "x",
        int : "y",
        double : "m",
        int : vx = 0,
        int : vy = 0,
    }
    points.push(point);
    points[points.length - 1].x = x;
    points[points.length - 1].y = y;
    points[points.length - 1].vx = 2 * Math.random();
    points[points.length - 1].vy = 2 * Math.random();
    points[points.length - 1].m = 1;
}

function createPlanet(x, y){
    let planet = {
        double : "m",
        int : "x",
        int : "y",
    }
    planets.push(planet);
    planets[planets.length - 1].x = x;
    planets[planets.length - 1].y = y;
    planets[planets.length - 1].m = 1;
    ctx.beginPath();
    ctx.fillStyle = '#512474';
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function dist(x1, y1, x2, y2){
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) + 0.000000001;
}

function F(x1, y1, x2, y2){
    return 40 / dist(x1, y1, x2, y2) * dist(x1, y1, x2, y2);
}

function calculateVector(x1, y1, x2, y2){
    var answer = vector;
    answer.x = x1 + x2;
    answer.y = y1 + y2;
    return answer;
}

function drawPoints(){
    var x = 0, y = 0;
    var d, f;
    for(var i = 0;i < points.length; ++i){
        x = 0;
        y = 0;
        for(var j = 0; j < planets.length; ++j) {
            d = dist(planets[j].x, planets[j].y, points[i].x, points[i].y);
            f = F(planets[j].x, planets[j].y, points[i].x, points[i].y);
            x += (planets[j].x - points[i].x) / d * (f * 1.3 * Math.random());
            y += (planets[j].y - points[i].y) / d * (f * 1.3 * Math.random());
        }
        points[i].vx += x;
        points[i].vy += y;
        if (points[i].x + points[i].vx / 10000 > canvas.width)
            points[i].x = 0;
        if (points[i].x + points[i].vx / 10000 < 0)
            points[i].x = canvas.width;
        if (points[i].y + points[i].vy / 10000 > canvas.height)
            points[i].y = 0;
        if (points[i].y + points[i].vy / 10000 < 0)
            points[i].y = canvas.height;
        points[i].x += points[i].vx / 10000;
        points[i].y += points[i].vy / 10000;
        ctx.beginPath();
        ctx.fillStyle = '#321195';
        ctx.arc(points[i].x, points[i].y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

function drawPlanet(){
    for(var i = 0; i < planets.length; ++i) {
        ctx.beginPath();
        ctx.fillStyle = '#512474';
        ctx.arc(planets[i].x, planets[i].y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

function inizializePoint(n){
    for(var i = 0;i < n; ++i){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        createPoint(x | 0, y | 0);
    }
}

function inizializePlanet(n){
    for(var i = 0;i < n; ++i){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        createPlanet(x | 0, y | 0);
    }
}

inizializePoint(1000);
inizializePlanet(1);

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints();
    drawPlanet();
}

var last = performance.now();
draw();
var now = performance.now();

setInterval(draw, 1);

