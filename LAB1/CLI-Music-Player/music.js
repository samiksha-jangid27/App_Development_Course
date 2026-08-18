// ============================================================
// 🎵 CLI MUSIC PLAYER
// ============================================================
// A simple command-line music player built using Node.js.
//
// Features:
// 1. Accepts a directory path from the user.
// 2. Finds all MP3 files inside the directory.
// 3. Displays the available songs with numbers.
// 4. Allows the user to select a song.
// 5. Plays the selected song using macOS's `afplay` command.
//
// Technologies:
// - Node.js
// - File System (fs)
// - Path (path)
// - Child Process (spawn)
// - macOS `afplay`
// ============================================================


// ------------------------------------------------------------
// IMPORT REQUIRED MODULES
// ------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");


// ------------------------------------------------------------
// GLOBAL VARIABLES
// ------------------------------------------------------------

// Stores the list of MP3 songs found in the directory.
let songs = [];

// Stores the absolute path of the directory containing songs.
let songsDirectory;


// ------------------------------------------------------------
// LIST SONGS
// ------------------------------------------------------------
// Reads the given directory and finds all MP3 files.
//
// Parameter:
//     directoryPath - Path of the directory containing songs
//
// Returns:
//     Nothing. The function updates the global `songs` array.
// ------------------------------------------------------------

function listSongs(directoryPath) {

    fs.readdir(directoryPath, (err, files) => {

        // Handle directory reading errors.
        if (err) {

            console.error("\n❌ Error reading directory.");
            console.error(`Reason: ${err.message}`);

            console.log("\nPlease enter a valid directory path:");

            // Reset the directory so the user can try again.
            songsDirectory = undefined;

            return;
        }


        // ----------------------------------------------------
        // FILTER ONLY MP3 FILES
        // ----------------------------------------------------

        songs = files.filter(file =>
            file.toLowerCase().endsWith(".mp3")
        );


        // ----------------------------------------------------
        // CHECK IF DIRECTORY CONTAINS ANY MP3 FILES
        // ----------------------------------------------------

        if (songs.length === 0) {

            console.log("\n❌ No MP3 songs found in this directory.");
            console.log("\nPlease enter another directory:");

            // Allow the user to enter another directory.
            songsDirectory = undefined;

            return;
        }


        // ----------------------------------------------------
        // DISPLAY MUSIC PLAYER
        // ----------------------------------------------------

        console.log("\n🎵 My Music Player");
        console.log("------------------");

        songs.forEach((song, index) => {

            console.log(`${index + 1}. ${song}`);

        });


        console.log("\nEnter song number:");
    });
}


// ------------------------------------------------------------
// PLAY SONG
// ------------------------------------------------------------
// Plays the selected MP3 file using macOS `afplay`.
//
// Parameter:
//     songName - Name of the selected MP3 file
// ------------------------------------------------------------

function playSong(songName) {

    // Create the complete path to the selected song.
    const songPath = path.join(songsDirectory, songName);


    console.log(`\n▶ Playing: ${songName}`);


    // --------------------------------------------------------
    // START AUDIO PLAYER
    // --------------------------------------------------------
    // `afplay` is a command-line audio player available on macOS.
    //
    // spawn(command, arguments)
    //
    // Example:
    // afplay "/Users/user/Music/song.mp3"
    // --------------------------------------------------------

    const player = spawn("afplay", [songPath]);


    // --------------------------------------------------------
    // HANDLE PLAYER ERRORS
    // --------------------------------------------------------

    player.stderr.on("data", (data) => {

        console.error(`\n❌ Error playing song: ${data}`);

    });


    // --------------------------------------------------------
    // HANDLE SONG COMPLETION
    // --------------------------------------------------------

    player.on("close", (code) => {

        if (code === 0) {

            console.log("\n✓ Song finished playing.");

        } else {

            console.log(`\n❌ Player exited with code ${code}`);

        }


        // Ask the user to select another song.
        console.log("\nEnter another song number:");

    });
}


// ------------------------------------------------------------
// TERMINAL INPUT HANDLER
// ------------------------------------------------------------
// `process.stdin` receives input directly from the terminal.
//
// First input:
//     Directory path
//
// Subsequent inputs:
//     Song number
// ------------------------------------------------------------

process.stdin.on("data", (data) => {

    // Convert the input buffer into a string
    // and remove unnecessary spaces/newlines.
    const input = data.toString().trim();


    // --------------------------------------------------------
    // FIRST INPUT → DIRECTORY PATH
    // --------------------------------------------------------

    if (!songsDirectory) {

        // Convert the entered path into an absolute path.
        songsDirectory = path.resolve(input);


        console.log(`\n📁 Directory: ${songsDirectory}`);


        // Read and display songs.
        listSongs(songsDirectory);

        return;
    }


    // --------------------------------------------------------
    // SUBSEQUENT INPUT → SONG NUMBER
    // --------------------------------------------------------

    const songNumber = Number(input);


    // Check whether the entered number is valid.
    if (
        Number.isInteger(songNumber) &&
        songNumber >= 1 &&
        songNumber <= songs.length
    ) {

        // Convert the user's 1-based number
        // into the array's 0-based index.
        const selectedSong = songs[songNumber - 1];


        // Play the selected song.
        playSong(selectedSong);

    } else {

        console.log("\n❌ Invalid song number.");
        console.log("Please enter a valid song number:");

    }

});


// ------------------------------------------------------------
// START CLI APPLICATION
// ------------------------------------------------------------

console.log("\n🎵 My Music Player");
console.log("------------------");
console.log("Enter songs directory path:");