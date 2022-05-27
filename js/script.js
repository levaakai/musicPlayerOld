"use strict";

/********************************************************************************************************
 *                                                                                                      *
 *                                       TO - DO                                                        *
 *                        create a playlist variable (object of lists to track playlists)               *
 *                                                                                                      *
 *********************************************************************************************************/

let input = document.querySelector('input[type="file"]'),
    play_btn = document.querySelector(".btn-play"),
    next_btn = document.querySelector(".btn-next"),
    prev_btn = document.querySelector(".btn-prev"),
    tracks = [],
    audio = document.createElement("audio"),
    arr = ['apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli', 'apple', 'ball', 'cat', 'Lorem ipsum dolor sit amet consectetur adipisicing eli'],
    audio_queue = new AudioQueue(),
    playlist_btn = document.querySelector(".btn-playlist"),
    slider = document.querySelector('.slider'),
    handle = document.querySelector('.handle'),
    progress_bar_fill = document.querySelector('.progress-bar-fill'),
    duration_start = document.querySelector('.duration-start'),
    duration_end = document.querySelector('.duration-end'),
    playlist_content = document.querySelector(".playlist-content"),
    ul = document.querySelector("#ul"),
    mousedown = false;



//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

let playlist_section = document.querySelector("#playlist-section"),
    screen_panel_main = document.querySelector("#screen-panel-main"),
    icon = document.querySelectorAll(".icon"),
    add_playlist_btn = document.querySelector(".add-to-playlist"),
    now_playing_btn = document.querySelector(".btn-now-playing"),
    back_btn = document.querySelector(".back-btn"),
    now_playing_interface = document.querySelector("#now-playing-interface"),
    hamburger = document.querySelector(".icon"),
    track_details = document.querySelector(".track-details");






/**********************************************************************************************
 *                                    FUNCTION DECLARATIONS                                   *  
 * ********************************************************************************************/
// Queue to process audio functionalities
function AudioQueue() {
    let collection = [];
    let current = 0; // indexer

    this.enqueue = function (item) {
        collection.push(item);
    };

    this.isEmpty = function () {
        return collection.length === 0;
    };

    this.dequeue = function () {
        return collection.shift();
    };

    this.front = function () {
        if (!this.isEmpty())
            return collection[current];
        else
            return "List is empty";
    };

    this.size = function () {
        return collection.length;
    };

    this.next = function () {
        if (!this.isEmpty()) {
            current = current + 1;
            return collection[current];
        } else {
            return "List is empty";
        }
    }

    this.prev = function () {
        if (!this.isEmpty()) {
            current = current - 1;
            return collection[current];
        } else {
            return "List is empty";
        }
    }

    this.print = function () {
        console.log(collection);
    }
}

//load songs
let add_song = function (evt) {
    input.addEventListener("change", function (evt) {
        const reader = new FileReader();
        reader.onload = function () {
            let li = document.createElement("li");
            let text; 
            let p = document.createElement("p");

            audio_queue.enqueue(reader.result);
            audio.src = audio_queue.front();
            audio.load();
            tracks.push(input.files[0].name.slice(0, input.files[0].name.indexOf(".mp3")));
            text = document.createTextNode(input.files[0].name.slice(0, input.files[0].name.indexOf(".mp3")));
            li.append(text);
            ul.appendChild(li);
            playlist_content.appendChild(ul);
            p.append(text)
            track_details.appendChild(p);
        }
        reader.readAsDataURL(input.files[0]);
    }, false);
}

//remove songs
let remove_song = function (evt) {

}

// play and pause songs
let play_pause = function () {
    !audio.paused ? audio.pause() : audio.play();
    if (audio.paused)
        play_btn.innerHTML = '<i class="fas fa-play"></i>';
    else
        play_btn.innerHTML = '<i class="fas fa-pause"></i>';
}

// play next song
let next_song = function () {
    audio_queue.next();
    audio.src = audio_queue.front();
    audio.load();
    audio.play();
    play_btn.innerHTML = '<i class="fas fa-pause"></i>';
}

//play previous song
let prev_song = function () {
    audio_queue.prev();
    audio.src = audio_queue.front();
    audio.load();
    audio.play();
    play_btn.innerHTML = '<i class="fas fa-pause"></i>'
}

// displahy audio duration and current time
let update_time = function () {
    let duration_mins = Math.floor(audio.duration / 60); // audio duration in minutes
    let duration_secs = Math.floor(audio.duration % 60); // audio duration in seconds
    let current_secs = Math.floor(audio.currentTime % 60); // audio current time in seconds
    let current_mins = Math.floor(audio.currentTime / 60); // audio current time in minutes

    if (duration_secs < 10)
        duration_end.textContent = `${duration_mins}:0${duration_secs}`;
    else
        duration_end.textContent = `${duration_mins}:${duration_secs}`;

    if (current_secs < 10)
        duration_start.textContent = `${current_mins}:0${current_secs}`; // create 0:00 time format
    else
        duration_start.textContent = `${current_mins}:${current_secs}`; // create 0:00 time format

}

// get slider handler current position
function seek_slider(evt) {
    let seek = (evt.clientX - progress_bar_fill.offsetLeft) / progress_bar_fill.clientWidth;
    seek = clamp(0, seek, 1);
    return seek;
}

// update progress bar (slider)
let update_slider = function () {
    audio.addEventListener('timeupdate', function (evt) {
        if (mousedown) {
            return;
        }
        let seek = audio.currentTime / audio.duration;
        slider.style.width = seek * 100 + "%";
    })

    audio.addEventListener('ended', function () {
        slider.style.width = 0 + "%";
    })
}

// remove negatives from seek handler for mousedown and mouseover events
function clamp(min, val, max) {
    return Math.min(Math.max(min, val), max);
}

/*EVENT LISTENERS */
window.addEventListener('mouseup', function (evt) {
    if (!mousedown) return;
    mousedown = false;
    let seek = seek_slider(evt);
    slider.style.width = seek * 100 + "%";
    audio.currentTime = seek * audio.duration;
});

window.addEventListener('mousemove', function (evt) {
    if (!mousedown) return;
    // mousedown = false;
    let seek = seek_slider(evt);
    slider.style.width = seek * 100 + "%";
    audio.currentTime = seek * audio.duration;
});

window.addEventListener('keydown', function (evt) {
    // console.log(evt)
    if (evt.keyCode === 32) {
        play_pause();
    } else if (evt.keyCode === 80) {
        prev_song();
    } else if (evt.keyCode === 78) {
        next_song();
    } else if (evt.keyCode === 77) {
        audio.muted ? audio.muted = false : audio.muted = true
    } else if (evt.keyCode === 83) {
        audio.currentTime = 0;
        audio.playbackRate = 0;
        play_btn.innerHTML = '<i class="fas fa-play"></i>'
    }
});

play_btn.addEventListener("click", function () {
    play_pause();
});

prev_btn.addEventListener('click', function () {
    prev_song();
});

audio.addEventListener('play', function () {
    setInterval(update_time, 1000);
});

audio.addEventListener("ended", function () {
    next_song();
});

next_btn.addEventListener('click', function () {
    next_song();
});

progress_bar_fill.addEventListener('mousedown', function (evt) {
    mousedown = true;
    let seek = seek_slider(evt);
    slider.style.width = seek * 100 + "%";
});



playlist_btn.addEventListener('click', function () {
    // if (screen_panel_main.style.display !== "none") {
        screen_panel_main.style.display = "none";
        playlist_section.style.display = "block";

        icon.forEach(i => { // hide sidebar icons
            i.style.display = "none";
        });

        add_playlist_btn.style.display = "block";
        now_playing_btn.style.display = "block";
        playlist_btn.style.display = "block";
        back_btn.style.display = "block";

        back_btn.addEventListener('click', function () {
            screen_panel_main.style.display = "block";
            playlist_section.style.display = "none";
        
            icon.forEach(i => {
                i.style.display = "block"; // display sidebar icons
            });
        
            add_playlist_btn.style.display = "none";
            now_playing_btn.style.display = "none";
            playlist_btn.style.display = "block";
            back_btn.style.display = "none";
        });

    playlist_btn.addEventListener('click', function () {
        console.log("Jst Cliked");
         playlist_section.style.display = "block";
    if (document.querySelector("#playlist-section-panel").style.display !== "block") {
        document.querySelector("#playlist-section-panel").style.display = "block";
        // document.querySelector(".add").style.display = "none";
    } else {
        document.querySelector("#playlist-panel").style.display = "none"
        // document.querySelector(".add").style.display = "block";
    }
});
    
    // playlist_section.style.display = "block";
    // if (document.querySelector("#playlist-panel").style.display !== "block") {
    //     document.querySelector("#playlist-panel").style.display = "block";
    //     document.querySelector(".add").style.display = "none";
    // } else {
    //     document.querySelector("#playlist-panel").style.display = "none"
    //     document.querySelector(".add").style.display = "block";
    // }
});

now_playing_btn.addEventListener('click', function() {
    //  if (screen_panel_main.style.display !== "none" || playlist_section.style.display !== "none") {
        screen_panel_main.style.display = "none";
        playlist_section.style.display = "none";
        document.querySelector(".default-sidebar").style.display = "none";
        document.querySelector("#now-playing-section").style.display = "block";
        // now_playing_interface.style.display = "block";
        icon.forEach(i => { // hide sidebar icons
            i.style.display = "block";
        });
        // document.querySelector(".now-playing-sidebar").style.display = "block";
        
    // }

});

   hamburger.addEventListener("click", function() {
            console.log("Hamburger clicked");
        });

    hamburger.addEventListener("mouseenter", function(evt) {
        console.log("Hamburger over ");
        console.log(evt);
    }, false);






/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\\ */

// playlist_section.addEventListener('click', function() {
//     console.log('section clikcked')
//     // document.querySelector("#screen-panel-main").style.display = hidden;
//     // playlist_section.style.display = "block";
// })








// function showType(fileInput) {
//     var files = fileInput.files;

//     for (var i = 0; i < files.length; i++) {
//       var name = files[i].name;
//       var type = files[i].type;
//       alert("Filename: " + name + " , Type: " + type);
//       songs.push(name);
//     }
//   }



add_song();
update_slider();


