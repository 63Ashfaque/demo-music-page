let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: '5eU2qin6c8U', // Meditation Music YouTube Video
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  });
}

function onPlayerReady(event) {
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeIcon = document.getElementById('volume-icon');
  const playIcon = document.getElementById('play-icon');
  
  // Set initial volume
  player.setVolume(volumeSlider.value);
  
  // Play/Pause button event
  playPauseBtn.addEventListener('click', togglePlayPause);
  
  // Volume control event
  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    player.setVolume(volume);
    
    // Update volume icon based on volume level
    if (volume > 50) {
      volumeIcon.className = 'fas fa-volume-up';
    } else if (volume > 0) {
      volumeIcon.className = 'fas fa-volume-down';
    } else {
      volumeIcon.className = 'fas fa-volume-mute';
    }
  });
  
  // Mute/Unmute when clicking the volume icon
  volumeIcon.addEventListener('click', () => {
    if (player.isMuted()) {
      player.unMute();
      volumeSlider.value = player.getVolume();
      volumeIcon.className = player.getVolume() > 50 ? 'fas fa-volume-up' : 'fas fa-volume-down';
    } else {
      player.mute();
      volumeIcon.className = 'fas fa-volume-mute';
    }
  });
}

function togglePlayPause() {
  const playIcon = document.getElementById('play-icon');
  
  if (isPlaying) {
    player.pauseVideo();
    playIcon.className = 'fas fa-play';
  } else {
    player.playVideo();
    playIcon.className = 'fas fa-pause';
  }
}

function onPlayerStateChange(event) {
  // Update isPlaying based on player state
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById('play-icon').className = 'fas fa-pause';
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    isPlaying = false;
    document.getElementById('play-icon').className = 'fas fa-play';
  }
}
