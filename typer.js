var words, at, startTime, wpm;
var inGame = false;
var words_cont = document.getElementById('words_cont');
var input = document.getElementById("player_input");
var wpm_display = document.getElementById("wpm");


window.onload = new function(){
  // Load menu on load
  loadMenu();
  document.body.addEventListener("keydown", function(key){
    if(key.keyCode == 13 && !inGame){
      newGame();
    }
  });

}

function loadMenu(){
  words_cont.innerHTML = "<a href='javascript:newGame()'>Click here to start new game!</a><br>or hit enter.<br><span style='font-size:18px;position:relative;top:5px;'>Time starts when you start typing.</span>"
}

var start;
function newGame(){
  inGame = true;
  start = true;
  words = sorcerers_stone[Math.floor(Math.random()*sorcerers_stone.length)].split(" ");
  words_cont.innerHTML = words.join(" ");
  at = 0;
  input.focus();
}

function update(){

  if(!inGame){
    input.value = "";
    return;
  }

  if(start){
    startTime = Date.now();
    start = false;
  }

  var player_input = input.value; // Refresh input
  /**
   * If input is correct, show that with colors.
   */
  if(words[at].indexOf(player_input) == 0){
    input.style.color = "green";
  } else {
    input.style.color = "red";
  }
  if(at == (words.length-1) && player_input == words[at]){
    endGame();
    return;
  }
  if(player_input.indexOf(" ") != -1){
    if(words[at] == player_input.substr(0,player_input.length-1)){
      input.value = "";
      at++;
      console.log("New word!");
    } else {
      input.value = input.value.substr(0, (input.value.length-1));
    }
  }

  // Calculate WPM
  var time = (Date.now() - startTime)/1000/60;

  window.wpm = Math.round(at / time);
  wpm_display.innerHTML = "WPM: " + wpm;
  /**
   * Display progress
   */
   words_cont.innerHTML = ""; // Clear

   for(var i = 0; i < at; i++){
    words_cont.innerHTML += "<span style='color:green;'>" + words[i] + "</span> ";
    }
  for(var i = at; i < (words.length); i++){
    words_cont.innerHTML += "<span style='color:red;'>" + words[i] + "</span> ";
    }

  //  requestAnimationFrame(update);
}

function endGame(){
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
      return "Sorry, you're too good.";
    }
  }
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
}

/*
  Declare themes
*/

const darkTheme = {
  backgroundColor: "#111",
  foregroundColor: "#ededed",
  textColor: "#ffffff",
  linkColor: "#6fed63"
};

setTheme();

function setTheme(){
  var themeName = "default"
  if(theme == "dark") themeName = darkTheme;
  
  // Set background
  document.body.style.background = themeName.backgroundColor;
  // Set foreground color
  document.getElementById("words_cont").style.background = themeName.foregroundColor;
  document.getElementById("player_input").style.background = themeName.foregroundColor;
}




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














