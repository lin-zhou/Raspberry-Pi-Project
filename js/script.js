const pauseImagePath = 'url(images/Pause.png)';
const playImagePath = 'url(images/Play.png)';

var isPlaying = false;

// Tokens must be changed every hour
const apiToken = '<Spotify Web API Token goes here>';
const sdkToken = '<Web Playback SDK Token goes here>';

let thisDeviceID = null;

window.onSpotifyWebPlaybackSDKReady = () => {
     const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(sdkToken); }
     });

     // Error handling
     player.addListener('initialization_error', ({ message }) => { console.error(message); });
     player.addListener('authentication_error', ({ message }) => { console.error(message); });
     player.addListener('account_error', ({ message }) => { console.error(message); });
     player.addListener('playback_error', ({ message }) => { console.error(message); });

     // Playback status updates
     player.addListener('player_state_changed', state => { console.log(state); });

     // Ready
     player.addListener('ready', ({ device_id }) => {
          thisDeviceID = device_id;
          console.log('Ready with Device ID', device_id);
     });

     // Not Ready
     player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
     });

     // Connect to the player!
     player.connect();
};

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(apiToken);

function playMusic() {
     var options = {
      device_id: thisDeviceID,
          "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",      // This is a Carly Rae Jepsen album.
          "offset": {
               "position": 5     // This is the number in the album that the button starts playing at
          },
          "position_ms": 0
     };

     spotifyApi.play(options, function (err, data) {
          if (err) {
               console.log(err);
          } else {
               console.log('yay');
          }
     });
}

function pauseMusic() {

}


// This function is called when the mainButton element is clicked
function mainButtonAction() {
     var mainButton = document.getElementById("mainButton");
     if (!isPlaying) {                                           // Checks if music is already playing
          isPlaying = true;                                      // If music is not playing make it play now
          
          playMusic();                                           // Music plays, yay!

          mainButton.style.backgroundImage = pauseImagePath;     // Updates the backgroundImage of the mainButton to the Pause icon
          mainButton.style.backgroundPosition = "50% 50%";       // Updates the backgroundPosition of the mainButton for the Pause icon
     } else {
          isPlaying = false;                                     // If music is playing make it pause now

          pauseMusic();

          mainButton.style.backgroundImage = playImagePath;      // Updates the backgroundImage of the mainButton to the Play icon
          mainButton.style.backgroundPosition = "54% 50%";       // Updates the backgroundPosition of the mainButton for the Play icon
     }
}
