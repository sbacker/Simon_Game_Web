buttonColors = ["red","blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
started = false;
level = 0;

/*Registers if the starting key is pressed, then starts the sequence */
$(document).keypress(function(event) {
    if (started == false){
        nextSequence()
    };
    started = true;
})

temp = false;

$(document).ready(function() {
    $(".btn").click(function(){
        userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern)
        console.log(gamePattern);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswers(userClickedPattern.length);
    });
});

function checkAnswers(currentLevel) {
    if(userClickedPattern[currentLevel-1] == gamePattern[currentLevel-1]){
        if(userClickedPattern.length == gamePattern.length){
            sleep(1000).then(() => {
                userClickedPattern = [] 
                nextSequence(); 
            });
        }
        console.log("success");
        
    }
    else{
        console.log("wrong");
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
        $(document.body).addClass("game-over");
        sleep(200).then(() => {  $(document.body).removeClass("game-over"); });
        $("h1#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){ 
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    sleep(100).then(() => {  $("#" + currentColor).removeClass("pressed"); });
}

function playSound(name){

    switch(name){
        case "red":
            var red = new Audio('./sounds/red.mp3');
            red.play();
            break;
        case "green":
            var green = new Audio('./sounds/green.mp3');
            green.play();
            break;
        case "blue":
            var blue = new Audio('./sounds/blue.mp3');
            blue.play();
            break;
        case "yellow":
            var yellow = new Audio('./sounds/yellow.mp3');
            yellow.play();
            break;
        default:
            console.log(randomChosenColor);
    };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextSequence(){
    level = level + 1;
    $("h1#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);

    for (let i = 0; i < gamePattern.length; i++) {
        sleep((i+1) * 600).then(() => { $(`#${gamePattern[i]}`).fadeOut(100).fadeIn(100);});
    }

};
