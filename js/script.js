const pauseImagePath = 'url(images/Pause.png)';
const playImagePath = 'url(images/Play.png)';

var isPlaying = false;

// Tokens must be changed every hour
const apiToken = '<API Token Here>';
const sdkToken = '<Web Playback SDK Token Here>';

let thisDeviceID = null;

var pubnub = new PubNub({
    publishKey: "<Publish Key Here>",
    subscribeKey: "<Subscribe Key Here>",
    ssl: true
});

var songOffset = 0;
var startPosition = 0;
var lastSong = null;

// Tests if two objects are of equal value
function equals(a, b) {
     var aProps = Object.getOwnPropertyNames(a);
     var bProps = Object.getOwnPropertyNames(b);
 
     if (aProps.length != bProps.length) {
         return false;
     }
 
     for (var i = 0; i < aProps.length; i++) {
         var propName = aProps[i];
 
         if (a[propName] !== b[propName]) {
             return false;
         }
     }
 
     return true;
 }

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
     player.addListener('player_state_changed', state => { 
          console.log(state);
          if (state.paused) {
               startPosition = state.position;
          }

          // If playing a different song than last state, increase the song offset to match current song
          if (lastSong == null) {
               lastSong = state.track_window.current_track.id;
          } else if (!equals(state.track_window.current_track.id, lastSong)) {
               songOffset++;
               lastSong = state.track_window.current_track.id;
          }

     });

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
          "context_uri": "<Context URI Here>",     // This is a personal playlist
          "offset": {
               "position": songOffset     // This is the number in the album that the button starts playing at
          },
          "position_ms": startPosition    // This is the place in the song that the button starts playing at
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

          pauseMusic();                                          // Pauses music

          mainButton.style.backgroundImage = playImagePath;      // Updates the backgroundImage of the mainButton to the Play icon
          mainButton.style.backgroundPosition = "54% 50%";       // Updates the backgroundPosition of the mainButton for the Play icon
     }
}

pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
            var payload = {
                my: 'payload'
            };
            pubnub.publish(
                {
                    message: payload
                },
                function (status) {
                    // handle publish response
                }
            );
        }
    },
    message: function(message) {
         const response = message['message']['resp']
		  if ('play' ==  response && !isPlaying) {                   // Checks if music is already playing
			  isPlaying = true;                                      // If music is not playing make it play now

			  playMusic();

			   mainButton.style.backgroundImage = pauseImagePath;     // Updates the backgroundImage of the mainButton to the Pause icon
			   mainButton.style.backgroundPosition = "50% 50%";       // Updates the backgroundPosition of the mainButton for the Pause icon
		   } else {
			   isPlaying = false;                                     // If music is playing make it pause now

			   pauseMusic();

			   mainButton.style.backgroundImage = playImagePath;      // Updates the backgroundImage of the mainButton to the Play icon
			   mainButton.style.backgroundPosition = "54% 50%";       // Updates the backgroundPosition of the mainButton for the Play icon
		   }
         
    },
    presence: function(presenceEvent) {
        // handle presence
    }
})

pubnub.subscribe({
    channels: ['spotify-raspberry-control']
});
