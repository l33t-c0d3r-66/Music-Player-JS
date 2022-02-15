//Accessing HTML Elements Using DOM.
let nowPlaying  = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let playPauseButton = document.querySelector(".play-pause-track");
let nextButton = document.querySelector(".next-track");
let previousButton =  document.querySelector(".previous-track");
let seekSlider = document.querySelector(".seek-slider");
let volumeSlider = document.querySelector(".volume-slider");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let currentTrack = document.createElement("audio");

// Variables
let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img: 'images/slanger.png',
        name: 'Love is Gone',
        artist: 'Acoustics',
        music: 'music/Love is gone.mp3'
    },
    {
        img: 'images/young.jpg',
        name: 'Why',
        artist: 'Young Stunner',
        music: 'music/Why.mp3'
    },
    {
        img: 'images/heathens.jpg',
        name: 'Heathens',
        artist: 'Twenty One Pilots',
        music: 'music/Heathens.mp3'
    },
    {
        img: 'images/cokestudio.png',
        name: 'Jaane Ke Zid',
        artist: 'Farida Khanum',
        music: 'music/Jaane Ke Zid.mp3'
    },
    {
        img: 'images/cokestudio.png',
        name: 'Pasori',
        artist: 'Ali Sethi x Shae Gill',
        music: 'music/Pasori.mp3'
    }
]

loadTrack(trackIndex);

function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    reset();
    currentTrack.src = musicList[trackIndex].music;
    currentTrack.load();
    trackArt.style.backgroundImage = "url("+musicList[trackIndex].img+")";
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    nowPlaying.textContent = "Playing music " + (trackIndex + 1) + " of " + musicList.length;
    updateTimer = setInterval(setUpdate, 1000);
    currentTrack.addEventListener('ended', playForwardTrack);
    randomBackgroundColor();

}

// Function to set Random Background Gradient
function randomBackgroundColor() {
    let hex = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e'];
    let a;

    //Function to generate random color
    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let color1 = populate("#");
    let color2 = populate("#");
    let color3 = populate("#");

    var angle = 'to right';
    let gradient = 'linear-gradient(' + angle + ',' + color1 + ',' + color2 + ',' + color3 + ')';
    document.body.style.background = gradient;

}

// Reset Everything
function reset() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

// Play Random Track
function randomTrack() {
    console.log(isRandom);
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom  = true;
    randomIcon.classList.add("randomActive");
}

function pauseRandom() {
    isRandom  = false;
    randomIcon.classList.remove("randomActive");
    
}

// Function to Repeat Current Song
function repeatTrack() {
    let currentIndex = trackIndex;
    loadTrack(currentIndex);
    playTrack();
}

// Function to Pause/Play Song
function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

// Function to Play Song
function playTrack() {
    currentTrack.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    wave.classList.add('loader');
    playPauseButton.innerHTML = "<i class='fa fa-pause-circle fa-5x'></i>";
}

//Function to Pause Song
function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    wave.classList.remove('loader');
    playPauseButton.innerHTML = "<i class='fa fa-play-circle fa-5x'></i>";
}

//Function to play next Song
function playForwardTrack() {
    if(trackIndex < musicList.length - 1 && isRandom === false){
        trackIndex += 1;
    } else if(trackIndex < musicList.length - 1 && isRandom === true) {
        let randomIndex = Number.parseInt(Math.random()*musicList.length);
        trackIndex = randomIndex;
    } else {
        trackIndex = 0;
    }
    loadTrack(trackIndex);
    playTrack();
}

// Function to play previous Song
function playPreviousTrack() {
    if(trackIndex > 0) {
        trackIndex -= 1;
    } else {
        trackIndex = musicList.length - 1;
    }
    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    let seekto = currentTrack.duration * (seekSlider.value / 100);
    currentTrack.currentTime = seekto;
}

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}
// Update Function
function setUpdate() {
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if(durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if(currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if(durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;



    }

}