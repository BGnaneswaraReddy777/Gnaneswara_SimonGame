var buttonColors=["green",'red',"yellow",'blue'];
var gamePattern=[];
var userClickedPath=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started)
    {
        $("h1").text("level "+level)
        nextSequnce();
        started=true;
    }
})
$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPath.push(userChoosenColor);
    playSound(userChoosenColor);
    animation(userChoosenColor);
    checkAnswer(userClickedPath.length-1);
})
function nextSequnce(){
    userClickedPath=[];
    level++;
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPath[currentLevel]){
        console.log("success");
    if(userClickedPath.length===gamePattern.length){
        setTimeout(function(){
            nextSequnce();
        },1000);
    }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#heading").text("Game Over, Press any key to restart");
        startOver();
    }
}
function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animation(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $(".btn").blur();
}
