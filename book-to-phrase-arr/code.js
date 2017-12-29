function convert(){

  const forbiddenChars = ['"', ";", "/", "*", "-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  document.getElementById("status").innerHTML = "<span style='color:orange;'>Working on it...</span>";
  var input = document.getElementById("input").value;

  var input = input.split(".");
  var final = new Array();

/* Loop though and get phrases */
  for(var i = 0; i < input.length; i++){
    var err = false;
    var paket = input[i];
    while(paket.length < 100){
      paket += "." + input[i+1];
      input.splice(i+1, 1);
    }
    for(var t = 0; t < forbiddenChars.length; t++){
      if(paket.indexOf(forbiddenChars[t]) != -1){
          err = true;
      }
    }

    if(paket.length < 250){
      while(paket[0] == " " || !isNaN(paket[0])) paket = paket.substr(1,paket.length);
      if(!err){
        paket += ".";
        final.push(JSON.stringify(paket));
      }
    }
  }

  document.getElementById("output").value = "var book_title = [" + final + "];";
  document.getElementById("status").innerHTML = "<span style='color:green;'>Done!</span><br>";
}
