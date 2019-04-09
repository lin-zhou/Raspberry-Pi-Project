var isPlaying = false;

function mainButtonAction() {
     var mainButton = document.getElementById("mainButton");
     if (!isPlaying) {
          isPlaying = true;

          var urlString = 'url(images/Pause.png)';
          mainButton.style.backgroundImage = urlString;
          mainButton.style.backgroundPosition = "50% 50%";
     } else {
          isPlaying = false;

          var urlString = 'url(images/Play.png)';
          mainButton.style.backgroundImage = urlString;
          mainButton.style.backgroundPosition = "54% 50%";
     }
}
