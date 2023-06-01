
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

/** Begins a new game. */
$(document).on("keypress", function () {
    if (level === 0) {
        nextSequence();
        $("#level-title").text("Level " + level);
    }
});

$("div.btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    animatePokemon(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

/** Determines next random color. */
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    animatePokemon(randomChosenColor);
    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level);
}

/** Checks if the player's choice is consistent with the game pattern. */
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function animatePokemon(currentColor) {
    var currentPokemon = $("#" + currentColor + " .pokemon");
    intShakes = 5;
    intDistance = 5;
    intDuration = 500;
    currentPokemon.each(function () {
        currentPokemon.css("position","relative"); 
        for (var i = 1; i <= intShakes; i++) {
            currentPokemon.animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
            .animate({left:intDistance}, ((intDuration/intShakes)/2))
            .animate({left:0}, (((intDuration/intShakes)/4)));
        }
    });
}

/** Instructions */
var instructionsOpen = false;
var infoPanel = $(".info-panel");
infoPanel.hide();
$("div.info-btn").click(animateHowToPlay);

function animateHowToPlay() {
    animatePress("info-btn");
    
    if (instructionsOpen) {
        $("#info-btn-text").text("How to Play");
        infoPanel.slideUp();
        instructionsOpen = false;
    }
    else {
        $("#info-btn-text").text("Close");
        infoPanel.slideDown();
        instructionsOpen = true;
    }
}