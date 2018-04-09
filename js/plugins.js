/**
 * Grab Snaffles and try to throw them through the opponent's goal!
 * Move towards a Snaffle and use your team id to determine where you need to throw it.
 **/

var myTeamId = parseInt(readline()); // if 0 you need to score on the right of the map, if 1 you need to score on the left

var obj = {
    int : x,
    int : y,
    int : vx,
    int : vy,
    var : type = "",
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    var myScore = parseInt(inputs[0]);
    var myMagic = parseInt(inputs[1]);
    var inputs = readline().split(' ');
    var opponentScore = parseInt(inputs[0]);
    var opponentMagic = parseInt(inputs[1]);
    var entities = parseInt(readline()); // number of entities still in game

    var wiz = [];
    var ball = [];
    var enemy = [];

    for (var i = 0; i < entities; i++) {
        var inputs = readline().split(' ');
        var entityId = parseInt(inputs[0]); // entity identifier
        var entityType = inputs[1]; // "WIZARD", "OPPONENT_WIZARD" or "SNAFFLE" (or "BLUDGER" after first league)
        var x = parseInt(inputs[2]); // position
        var y = parseInt(inputs[3]); // position
        var vx = parseInt(inputs[4]); // velocity
        var vy = parseInt(inputs[5]); // velocity
        var state = parseInt(inputs[6]); // 1 if the wizard is holding a Snaffle, 0 otherwise
        if (entityType != 'BLUDGER'){
            var sm = obj;
            sm.x = x;
            sm.y = y;
            sm.vx = vx;
            sm.vy = vy;
            sm.type = entityType;
            if (entityType == "WIZARD")
                wiz.push(sm);
            else if (entityType == "OPPONENT_WIZARD")
                enemy.push(sm);
            else if (entityType == "SNAFFLE"){
                ball.push(sm);
                printErr(x, y, vx, vy, entityType);
                printErr(ball[ball.length - 1].x, ball[ball.length - 1].y, ball[ball.length - 1].vx, ball[ball.length - 1].vy);
                printErr();
            }
        }
    }
    for(var i = 0;i < ball.length; i++)
        printErr(ball[i].x, ball[i].y, ball[i].type);
    for (var i = 0; i < 2; i++) {
        var min = 1e9;
        var secondx = 500, secondy = 500;
        for(var elem in ball){
            if (min > dist(elem.x, elem.y, wiz[i].x, wiz[i],y)){
                min = dist(elem.x, elem.y, wiz[i].x, wiz[i],y);
                if (min > 400){
                    if (dist(wiz[1 - i].x, wiz[1 - i].y, elem.x, elem.y) < min){
                        wiz[1 - i].vx = elem.x;
                        wiz[1 - i].vy = elem.y;
                        wiz[1 - i].target = elem.target;
                        wiz[i].vx = secondx;
                        wiz[i].vy = secondy;
                    }
                    else{
                        wiz[i].vx = elem.x;
                        wiz[i].vy = elem.y;
                        wiz[i].target = elem.target;
                    }
                    secondx = elem.x;
                    secondy = elem.y;
                }
            }
        }
        if (min <= 300){
            if (myTeamId === 1)
                print('THROW 0 3750 500')
            else
                print('THROW 16000 3750 500')
        }
        else if (min > 400)
            print('MOVE', Math.abs(wiz[1].x), Math.abs(wiz[1].y), '150');
        // Write an action using print()
        // To debug: printErr('Debug messages...');


        // Edit this line to indicate the action for each wizard (0 ≤ thrust ≤ 150, 0 ≤ power ≤ 500)
        // i.e.: "MOVE x y thrust" or "THROW x y power"
    }
    wiz = [];
    ball = [];
    enemy = [];
}
