var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var started = false;

var level = 0;

$(document).on("keypress", function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){

    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").on("click", function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
    

        if(gamePattern.length === userClickedPattern.length){

           setTimeout(function(){
                nextSequence();
            }, 1000);
        }
   }
   else{
    console.log("wrong");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    startOver();
   }


}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
