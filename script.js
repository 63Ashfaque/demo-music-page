let audioPlayer;
let isPlaying = false;

document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  audioPlayer = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeIcon = document.getElementById('volume-icon');
  const playIcon = document.getElementById('play-icon');
  const resetBtn = document.getElementById('resetBtn');
  
  // Set initial volume (0-1 range for audio API)
  audioPlayer.volume = volumeSlider.value / 100;
  
  // Play/Pause button event
  playPauseBtn.addEventListener('click', togglePlayPause);
  
  // Volume control event
  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value / 100; // Convert to 0-1 range
    audioPlayer.volume = volume;
    
    // Update volume icon based on volume level
    if (volume > 0.5) {
      volumeIcon.className = 'fas fa-volume-up';
    } else if (volume > 0) {
      volumeIcon.className = 'fas fa-volume-down';
    } else {
      volumeIcon.className = 'fas fa-volume-mute';
    }
  });
  
  // Mute/Unmute when clicking the volume icon
  volumeIcon.addEventListener('click', () => {
    if (audioPlayer.muted) {
      audioPlayer.muted = false;
      volumeSlider.value = audioPlayer.volume * 100;
      volumeIcon.className = audioPlayer.volume > 0.5 ? 'fas fa-volume-up' : 'fas fa-volume-down';
    } else {
      audioPlayer.muted = true;
      volumeIcon.className = 'fas fa-volume-mute';
    }
  });
  
  // Reset button functionality
  resetBtn.addEventListener('click', () => {
    // Reset audio
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.volume = 0.7; // Reset to default volume (70%)
    volumeSlider.value = 70;
    
    // Reset play/pause state
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    
    // Reset volume icon
    audioPlayer.muted = false;
    volumeIcon.className = 'fas fa-volume-up';
    
    // Optional: add a visual feedback for reset
    resetBtn.classList.add('active');
    setTimeout(() => {
      resetBtn.classList.remove('active');
    }, 300);
  });
  
  // Double-click on reset button to reload the page
  resetBtn.addEventListener('dblclick', () => {
    location.reload();
  });
  
  // Update play/pause icon when audio ends
  audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.className = 'fas fa-play';
  });
});

function togglePlayPause() {
  const playIcon = document.getElementById('play-icon');
  
  if (isPlaying) {
    audioPlayer.pause();
    playIcon.className = 'fas fa-play';
    isPlaying = false;
  } else {
    audioPlayer.play()
      .then(() => {
        playIcon.className = 'fas fa-pause';
        isPlaying = true;
      })
      .catch(error => {
        console.error('Error playing audio:', error);
      });
  }
}
