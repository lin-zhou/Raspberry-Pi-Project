const pauseImagePath = 'url(images/Pause.png)';
const playImagePath = 'url(images/Play.png)';

var isPlaying = false;

// This function is called when the mainButton element is clicked
function mainButtonAction() {
     var mainButton = document.getElementById("mainButton");
     if (!isPlaying) {                                           // Checks if music is already playing
          isPlaying = true;                                      // If music is not playing make it play now

          // This is where the code for playing a music stream should go using a music API

          mainButton.style.backgroundImage = pauseImagePath;     // Updates the backgroundImage of the mainButton to the Pause icon
          mainButton.style.backgroundPosition = "50% 50%";       // Updates the backgroundPosition of the mainButton for the Pause icon
     } else {
          isPlaying = false;                                     // If music is playing make it pause now

          // This is where the code for pausing a music stream should go using a music API

          mainButton.style.backgroundImage = playImagePath;      // Updates the backgroundImage of the mainButton to the Play icon
          mainButton.style.backgroundPosition = "54% 50%";       // Updates the backgroundPosition of the mainButton for the Play icon
     }
}
