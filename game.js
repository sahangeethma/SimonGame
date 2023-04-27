
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

$(document).touchstart(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  console.log(gamePattern);
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      },1000);
    }
  }else{
    console.log("wrong");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Level " + level + ", Game is Over. Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}


function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = (buttonColours[randomNumber]);

  level++;
  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(colour){
  // var audio = new Audio("/sounds/" + colour + ".mp3");
  // audio.play();
  new Audio("sounds/" + colour + ".mp3").play();
}

function animatePress(colour){
  $("#" + colour).addClass("pressed");
  setTimeout(function(){
    $("#" + colour).removeClass("pressed");
  },100);
}
