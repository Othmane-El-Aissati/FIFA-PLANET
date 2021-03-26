var music = document.getElementById("mySong");
music.volume = setVolumeOn();
    
  function setVolumeOff() { 
    music.volume = 0.0;
  } 
    
  function setVolumeOn() { 
    music.volume = 0.1;
  } 