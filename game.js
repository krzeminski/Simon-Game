var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

//Reseting Game
$(document).keypress(function(){
  if(!gameOn){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameOn = true;
  }
});

//User Input
$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer((userClickedPattern.length-1));
});



//Game core
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



//Effects
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
          nextSequence();
        },500);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}

function startOver(){
    gameOn = false;
    level = 0;
    gamePattern = [];
}
