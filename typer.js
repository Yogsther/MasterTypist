var words, at, startTime, wpm;
var inGame = false;
var words_cont = document.getElementById('words_cont');
var input = document.getElementById("player_input");
var wpm_display = document.getElementById("wpm");

// Setup canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var cheatMode = false;

function loadMenuText(){
  words_cont.innerHTML = "<a href='javascript:newGame()'>Click here to start new game!</a><br>or hit enter.<br><span style='font-size:18px;position:relative;top:5px;'>Time starts when you start typing.</span>"
}

var start;
function newGame(){
  lastInputRec = "";
  inGame = true;
  start = true;
  words = sorcerers_stone[Math.floor(Math.random()*sorcerers_stone.length)].split(" ");
  words_cont.innerHTML = words.join(" ");
  at = 0;
  currentLetters = 0;
  input.focus();
}

// Setup sprites
var spr_bg = new Image();
spr_bg.src = "img/landscape.png";

var spr_bird = new Image();
spr_bird.src = "img/bird_0.png";

var spr_menu = new Image();
spr_menu.src = "img/menu.png";


function loadMenu(){
  // Setup to render the menu
  window.birdPosX = 0;
  window.birdPosY = 0;
  window.birdRoation = 0;
  drawMenu();
}

function positiveOrNegative(){
  // Randomly returns positive or negative
  // Not used.
  var outcome = Math.floor(Math.random()*2);
  if(outcome > 0){
    return -1;
  } else {
    return 1;
  }  
}

var direction = "up";
var height = 0;


function drawMenu(){ // And game
  // Draw menu canvas
  // TODO add return when toggle darkmode bug
  var speedUp = 0.4;
    if(direction === "up") height += speedUp;
    if(direction === "down") height -= speedUp;
    if(height > 20) direction = "down";
    if(height < 0) direction = "up";
    ctx.drawImage(spr_bg, 0, 0); // Draw background
  if(!inGame){
    ctx.drawImage(spr_menu, 0, 0);
    requestAnimationFrame(drawMenu);
  }
  if(inGame){
    
    var clearedWords = [];
    for(var i = 0; i < at; i++){
      clearedWords.push(words[i]);
    }
    var wordsJoined = clearedWords.join(" ");
    var typedLetters = wordsJoined.length + currentLetters;
    var timeline = (typedLetters) / words.join(" ").length;
    var xPos = 450 * timeline;
    ctx.drawImage(spr_bird, xPos, height+10, 50, 50);
    requestAnimationFrame(drawMenu);
  }
}

var currentLetters = 0;
var lastInputRec = "";

var correctTypes = 0;
var missTypes = 0;

function update(){

  if(!inGame){
    input.value = "";
    return;
  }

  if(start){
    startTime = Date.now();
    start = false;
  }
  
  if(cheatMode){
    if(at == words.length){
      endGame();
    }
    if(input.value.length > words[at].length){
      input.value = "";
      at++;
    }
    input.value = words[at].substr(0, input.value.length);
  }

  var player_input = input.value; // Refresh input
  /**
   * If input is correct, show that with colors.
   */
  if(words[at].indexOf(player_input) == 0){
    input.style.color = greenColor;
  } else {
    input.style.color = redColor;
  }
  if(at == (words.length-1) && player_input == words[at]){
    endGame();
    return;
  }
  if(player_input.indexOf(" ") != -1){
    if(words[at] == player_input.substr(0,player_input.length-1)){
      input.value = "";
      missTypes-=1;
      at++;
    } else {
      input.value = input.value.substr(0, (input.value.length-1));
    }
  }

  
    
    //Record percentage
    if(lastInputRec.length < player_input.length){
      // Typed new letter
      if(player_input == words[at].substr(0,player_input.length)){
        correctTypes++;
      } else {
        missTypes++;
      }
    }
  
    lastInputRec = player_input;

    // Calculate percentage
    // Correct types / total types
    window.percentage = (correctTypes / (correctTypes + missTypes)) * 100;
    console.log(percentage + "%");
    
    // Calculate WPM
    var time = (Date.now() - startTime)/1000/60;
    player_input = input.value;
    window.wpm = Math.round(at / time);
    wpm_display.innerHTML = "WPM: " + wpm + " <span style='color:" + greenColor + "'>" + Math.round(percentage) + "%";
    words_cont.innerHTML = ""; // Clear display window
  
  
   for(var i = 0; i < at; i++){
    words_cont.innerHTML += "<span style='color:" + greenColor + ";'>" + words[i] + "</span> ";
    }
    var loggedLetters;
    currentLetters = 0;
    for(var i = 0; i < player_input.length; i++){
    // Track were you are on the character
      if(words[at][i] != player_input[i]) break;
      currentLetters++;
      words_cont.innerHTML += "<span style='color:" + greenColor + ";'>" + words[at][i]; + "</span> ";
      loggedLetters = i;
    }
      words_cont.innerHTML += "<span style='color:" + redColor + ";'>" + words[at].substr(loggedLetters+1,words[at].length) + "</span> ";

  
  for(var i = at+1; i < (words.length); i++){
    words_cont.innerHTML += " <span style='color:" + redColor + ";'>" + words[i] + "</span>";
    }

  //  requestAnimationFrame(update);
}

function endGame(){
  cheatMode = false;
  wpm_display.innerHTML = "";
  var now = Date.now();
  inGame = false;
  var time = now - startTime;
  input.value = "";
  words_cont.innerHTML = "Game over! <br>Avrage WPM " + wpm + "!<br> Title: " + getSkill(wpm) + "<br><a href='javascript:newGame()'>Click here to play again</a> or hit enter.";
}

function getSkill(wpm){
  var skills = [{
    rate: 0,
    title: "Pre-Beginner"
  }, {
    rate: 20,
    title: "Beginner"
  }, {
    rate: 35,
    title: "Avrage"
  }, {
    rate: 40,
    title: "Above avrage"
  }, {
    rate: 50,
    title: "Faster"
  }, {
    rate: 60,
    title: "Quick typer"
  }, {
    rate: 70,
    title: "Fastest typer in the west"
  }, {
    rate: 80,
    title: "Professional typist"
  }, {
    rate: 90,
    title: "Competetive Typer"
  }, {
    rate: 100,
    title: "Master Typer"
  }, {
    rate: 110,
    title: "Grand Master Typist"
  }];

  for(var i = 0; i < skills.length; i++){
    try{
      if(wpm >= skills[i].rate && wpm < skills[i+1].rate){
        return skills[i].title;
      }
    } catch(e){
      return "Cheater...";
    }
  }
}

if(readCookie("theme") == null){
  createCookie("theme", "dark", 10000);
}
var theme = readCookie("theme");
function toggleTheme(){
  if(theme == "default"){
    // DARK
    theme = "dark"
    createCookie("theme", "dark", 10000)
  } else {
    // WHITE
    theme = "default";
    createCookie("theme", "default", 10000)
  }
  setTheme();
  loadMenu();
}

/*
  Declare themes
*/

var redColor, greenColor;

// Actually default theme.
const darkTheme = {
  backgroundColor: "#111",
  foregroundColor: "#282828",
  textColor: "#ffffff",
  linkColor: "#6fed63",
  redColor: "#ff4949",
  greenColor: "#4bfc7d"
};

// Not actually default.
const defaultTheme = {
  backgroundColor: "white",
  foregroundColor: "white",
  textColor: "black",
  linkColor: "#3c9b4b",
  redColor: "#c12d2d",
  greenColor: "#2ec13d"
};

setTheme();

function setTheme(){
  var themeName = defaultTheme;
  if(theme == "dark") themeName = darkTheme;
  
  // Set red and green colors
  redColor = themeName.redColor;
  greenColor = themeName.greenColor;
  
  document.getElementById("darkToggle").style.color = themeName.textColor;
  
  // Set background
  document.body.style.background = themeName.backgroundColor;
  document.body.style.color = themeName.textColor;
  // Set foreground color
  document.getElementById("words_cont").style.background = themeName.foregroundColor;
  document.getElementById("player_input").style.background = themeName.foregroundColor;
  
  var arr = document.getElementsByTagName("a");
  for(var i = 0; i < arr.length-1; i++){
    arr[i].style.color = themeName.linkColor;
  }
  
}



window.onload = new function(){
  // Load menu on load
  loadMenu();
  loadMenuText();
  document.body.addEventListener("keydown", function(key){
    console.log(key.keyCode);
    if(key.keyCode == 13 && !inGame){
      if(cDown) cheatMode = true;
      newGame();
    }
  });

}
// Watch for C press
var cDown = false;
document.body.addEventListener("keydown", function(key){
  if(key.keyCode == 67) cDown = true; 
});

document.body.addEventListener("keyup", function(key){
  if(key.keyCode == 67) cDown = false;
});


function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}










