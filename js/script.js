const pauseImagePath = 'url(images/Pause.png)';
const playImagePath = 'url(images/Play.png)';

var isPlaying = false;

// Tokens must be changed every hour
const apiToken = 'BQDPZZrLZqm5Muz1qxyF7DPvf8DdCIosH3km3W159q92cOT1zd-L2LfeNdbdqiS_wzO6WPWLbJSGVlePltTEip5wk71zKDvUsyRglPCBC5lVit_AEjY0aykJ4R57vu5JRL9-6RjlkZ3b9EC28o2ymAZxFhJbxoKFUE8S-5LnMqWHocqcgDmcfOlUiol7Fkv6I0wt5dFFWw';
const sdkToken = 'BQCm9kRav_uEVCSg-pqDooGZNiTI3Qm5upa3hLt_0kPWoO_6dZ6YUkv8rQX8res2lkSSS9YGak76YUcN_Fgii9R03V3xr5thSpmfswIyPxcpDcIXBsuM6VKLRDqacGtHe_PmZ_kIV-EZ90qJZkZloPxOb635Wty75GO48n-Ziw';

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

var startSong = 5;
var startPosition = 0;
function playMusic() {
     var options = {
      device_id: thisDeviceID,
          "context_uri": "spotify:user:12151715008:playlist:1MX4SSCPEjFtfW7DLv7YGp",     // This is a personal playlist
          "offset": {
               "position": startSong     // This is the number in the album that the button starts playing at
          },
          "position_ms": startPosition
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
     spotifyApi.pause();
     startSong = 5;          // Change this to be whatever song we left off at
     startPosition = 0;      // It'd be super cool if this could set to the position_ms at time of pausing, but alas
}

// This function is called when the mainButton element is clicked
function mainButtonAction() {
     var mainButton = document.getElementById("mainButton");
     if (!isPlaying) {                                           // Checks if music is already playing
          isPlaying = true;                                      // If music is not playing make it play now
          
          playMusic();                                           // Music plays, yay! Unfortunately, it starts from the beginning each time.

          mainButton.style.backgroundImage = pauseImagePath;     // Updates the backgroundImage of the mainButton to the Pause icon
          mainButton.style.backgroundPosition = "50% 50%";       // Updates the backgroundPosition of the mainButton for the Pause icon
     } else {
          isPlaying = false;                                     // If music is playing make it pause now

          pauseMusic();                                          // Pauses music

          mainButton.style.backgroundImage = playImagePath;      // Updates the backgroundImage of the mainButton to the Play icon
          mainButton.style.backgroundPosition = "54% 50%";       // Updates the backgroundPosition of the mainButton for the Play icon
     }
}
