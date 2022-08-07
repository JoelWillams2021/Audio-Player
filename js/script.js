const Media = new Audio ("sounds/D4DJ Song.mp3");
var sliderValue = Media.playbackRate;
var w = document.documentElement.clientWidth || window.innerWidth;


function setUp(){
    Media.playbackRate = document.getElementById("customRange2").value;
    Media.volume = document.getElementById("customRange1").value / 100;
    document.getElementById("customRange3").max = Media.duration;
    document.getElementById("customRange3").value = Media.currentTime;
    sliderValue = Media.playbackRate;
    document.querySelector(".slider-value").innerHTML = sliderValue + "x";
    if (w <= 768) {
        document.getElementById("customRange1").disabled = true;
    } else {
        document.getElementById("customRange1").disabled = false;
    }

}


function playMedia() {
      Media.play();
      document.querySelector(".image").src="images/playbutton.png";
      document.querySelector(".image").addEventListener("click", pauseMedia);
      if (Media.currentTime ==  document.getElementById("customRange3").value ){
        Media.loop = true;
      }
      Media.addEventListener("timeupdate", progressThroughTrack);
      returnDuration();
      Media.addEventListener("timeupdate", returnCurrentDuration);
}

function pauseMedia(){
    Media.pause();
    document.querySelector(".image").src="images/pause-button.png";
    document.querySelector(".image").removeEventListener("click", pauseMedia);
    document.querySelector(".image").addEventListener("click", playMedia);
}

function increaseVolume(){
    Media.volume = document.getElementById("customRange1").value / 100;
    console.log(Media.volume);
    if (Media.volume < 0.25 && Media.volume >= 0.01){
        document.querySelector(".responsive-image").src="images/volume-low.png";
    } else if (Media.volume > 0.75){
        document.querySelector(".responsive-image").src="images/volume-loud.png";
    } else if (Media.volume == 0.5) {
        document.querySelector(".responsive-image").src="images/volume-med.png";
    } else if (Media.volume == 0){
        document.querySelector(".responsive-image").src="images/volume-button.png";
    }
      
}

function increaseSpeed(){
    Media.playbackRate = document.getElementById("customRange2").value;
    sliderValue = Media.playbackRate;
    document.querySelector(".slider-value").innerHTML = sliderValue + "x";
   
}

function seekThrough(){
    Media.currentTime = document.getElementById("customRange3").value; 
}

function progressThroughTrack(){
    document.getElementById("customRange3").value = Media.currentTime;
}

function returnDuration(){
    var num = Media.duration;
    var min = (num/60);
    if (min < 1){
        min = 0;
    }

    if (num >= 60){
        var sec = ((Math.floor(Media.duration)) - (Math.floor(min) * 60));
    }
    else if (num < 60){
        sec = (Math.floor(Media.duration));
    }

    if (num >= 10 && Math.floor(num) % 60 != 0 ){
        document.getElementById("durationLabel").innerHTML = Math.floor(min) + ":" + sec;
        console.log("hey");
        console.log(Media.duration);
    } else if (num <= 9){
        document.getElementById("durationLabel").innerHTML = Math.floor(min) + ":0" + sec;
    } else if ((Math.floor(num) % 60 == 0)){
        document.getElementById("durationLabel").innerHTML = Math.floor(min) + ":" + sec + "0";
    }
     
    
}

function returnCurrentDuration(){
    var currentDuration = Media.currentTime;
    var minutes = (Media.currentTime/60);
    if (minutes < 1){
        minutes = 0;
    }

    if (currentDuration >= 60){
        var seconds = (Math.floor(Media.currentTime) - (Math.floor(minutes) * 60) );
    } else if (currentDuration < 60){
        seconds = (Math.floor(Media.currentTime));
    }

    if (currentDuration >= 10 && Math.floor(currentDuration) % 60 != 0 ){
        document.getElementById("currentDurationLabel").innerHTML = Math.floor(minutes) + ":" + seconds;
    }  if (seconds > 0 && seconds < 10){
        document.getElementById("currentDurationLabel").innerHTML = Math.floor(minutes) + ":0" + seconds;
    } else if ((Math.floor(currentDuration) % 60 == 0)){
        document.getElementById("currentDurationLabel").innerHTML = Math.floor(minutes) + ":" + seconds + "0";
    } 

}



