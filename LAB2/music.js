// // ============================================================
// // 🎵 CLI MUSIC PLAYER
// // ============================================================
// // A simple command-line music player built using Node.js.
// //
// // Features:
// // 1. Accepts a directory path from the user.
// // 2. Finds all MP3 files inside the directory.
// // 3. Displays the available songs with numbers.
// // 4. Allows the user to select a song.
// // 5. Plays the selected song using macOS's `afplay` command.
// //
// // Technologies:
// // - Node.js
// // - File System (fs)
// // - Path (path)
// // - Child Process (spawn)
// // - macOS `afplay`
// // ============================================================


// // ------------------------------------------------------------
// // IMPORT REQUIRED MODULES
// // ------------------------------------------------------------

// const fs = require("fs");
// const path = require("path");
// const { spawn } = require("child_process");


// // ------------------------------------------------------------
// // GLOBAL VARIABLES
// // ------------------------------------------------------------

// // Stores the list of MP3 songs found in the directory.
// let songs = [];

// // Stores the absolute path of the directory containing songs.
// let songsDirectory;


// // ------------------------------------------------------------
// // LIST SONGS
// // ------------------------------------------------------------
// // Reads the given directory and finds all MP3 files.
// //
// // Parameter:
// //     directoryPath - Path of the directory containing songs
// //
// // Returns:
// //     Nothing. The function updates the global `songs` array.
// // ------------------------------------------------------------

// function listSongs(directoryPath) {

//     fs.readdir(directoryPath, (err, files) => {

//         // Handle directory reading errors.
//         if (err) {

//             console.error("\n❌ Error reading directory.");
//             console.error(`Reason: ${err.message}`);

//             console.log("\nPlease enter a valid directory path:");

//             // Reset the directory so the user can try again.
//             songsDirectory = undefined;

//             return;
//         }


//         // ----------------------------------------------------
//         // FILTER ONLY MP3 FILES
//         // ----------------------------------------------------

//         songs = files.filter(file =>
//             file.toLowerCase().endsWith(".mp3")
//         );


//         // ----------------------------------------------------
//         // CHECK IF DIRECTORY CONTAINS ANY MP3 FILES
//         // ----------------------------------------------------

//         if (songs.length === 0) {

//             console.log("\n❌ No MP3 songs found in this directory.");
//             console.log("\nPlease enter another directory:");

//             // Allow the user to enter another directory.
//             songsDirectory = undefined;

//             return;
//         }


//         // ----------------------------------------------------
//         // DISPLAY MUSIC PLAYER
//         // ----------------------------------------------------

//         console.log("\n🎵 My Music Player");
//         console.log("------------------");

//         songs.forEach((song, index) => {

//             console.log(`${index + 1}. ${song}`);

//         });


//         console.log("\nEnter song number:");
//     });
// }


// // ------------------------------------------------------------
// // PLAY SONG
// // ------------------------------------------------------------
// // Plays the selected MP3 file using macOS `afplay`.
// //
// // Parameter:
// //     songName - Name of the selected MP3 file
// // ------------------------------------------------------------

// function playSong(songName) {

//     // Create the complete path to the selected song.
//     const songPath = path.join(songsDirectory, songName);


//     console.log(`\n▶ Playing: ${songName}`);


//     // --------------------------------------------------------
//     // START AUDIO PLAYER
//     // --------------------------------------------------------
//     // `afplay` is a command-line audio player available on macOS.
//     //
//     // spawn(command, arguments)
//     //
//     // Example:
//     // afplay "/Users/user/Music/song.mp3"
//     // --------------------------------------------------------

//     const player = spawn("afplay", [songPath]);


//     // --------------------------------------------------------
//     // HANDLE PLAYER ERRORS
//     // --------------------------------------------------------

//     player.stderr.on("data", (data) => {

//         console.error(`\n❌ Error playing song: ${data}`);

//     });


//     // --------------------------------------------------------
//     // HANDLE SONG COMPLETION
//     // --------------------------------------------------------

//     player.on("close", (code) => {

//         if (code === 0) {

//             console.log("\n✓ Song finished playing.");

//         } else {

//             console.log(`\n❌ Player exited with code ${code}`);

//         }


//         // Ask the user to select another song.
//         console.log("\nEnter another song number:");

//     });
// }


// // ------------------------------------------------------------
// // TERMINAL INPUT HANDLER
// // ------------------------------------------------------------
// // `process.stdin` receives input directly from the terminal.
// //
// // First input:
// //     Directory path
// //
// // Subsequent inputs:
// //     Song number
// // ------------------------------------------------------------

// process.stdin.on("data", (data) => {

//     // Convert the input buffer into a string
//     // and remove unnecessary spaces/newlines.
//     const input = data.toString().trim();


//     // --------------------------------------------------------
//     // FIRST INPUT → DIRECTORY PATH
//     // --------------------------------------------------------

//     if (!songsDirectory) {

//         // Convert the entered path into an absolute path.
//         songsDirectory = path.resolve(input);


//         console.log(`\n📁 Directory: ${songsDirectory}`);


//         // Read and display songs.
//         listSongs(songsDirectory);

//         return;
//     }


//     // --------------------------------------------------------
//     // SUBSEQUENT INPUT → SONG NUMBER
//     // --------------------------------------------------------

//     const songNumber = Number(input);


//     // Check whether the entered number is valid.
//     if (
//         Number.isInteger(songNumber) &&
//         songNumber >= 1 &&
//         songNumber <= songs.length
//     ) {

//         // Convert the user's 1-based number
//         // into the array's 0-based index.
//         const selectedSong = songs[songNumber - 1];


//         // Play the selected song.
//         playSong(selectedSong);

//     } else {

//         console.log("\n❌ Invalid song number.");
//         console.log("Please enter a valid song number:");

//     }

// });


// // ------------------------------------------------------------
// // START CLI APPLICATION
// // ------------------------------------------------------------

// console.log("\n🎵 My Music Player");
// console.log("------------------");
// console.log("Enter songs directory path:");





const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const SONGS_DIR = path.join(
    __dirname,
    "../LAB2/song"
);;

let songs = [];
let userSelectionIndex = 0;

// -----------------------------
// LIST AVAILABLE SONGS
// -----------------------------
function listSongs(songDirectoryPath) {
    songs = fs
        .readdirSync(songDirectoryPath)
        .filter((file) => file.endsWith(".mp3"));

    // Clear terminal
    console.clear();

    console.log("🎵 My Music Player");
    console.log("------------------");

    songs.forEach((song, ind) => {
        if (ind === userSelectionIndex) {
            console.log(`> ${song}`);
        } else {
            console.log(`  ${song}`);
        }
    });

    console.log("\n↑ ↓ = Select");
    console.log("Enter = Play");
    console.log("Ctrl + C = Exit");
}

// -----------------------------
// PLAY SONG
// -----------------------------
function playSong(songFilePath) {
    console.log(`\n▶️ Playing: ${songFilePath}`);

    const play = spawn("afplay", [songFilePath]);

    play.on("close", (code) => {
        if (code === 0) {
            console.log("\n✓ Song finished playing.");
        } else {
            console.log(`\nPlayer exited with code ${code}`);
        }
    });
}

// -----------------------------
// INITIAL DISPLAY
// -----------------------------
listSongs(SONGS_DIR);

// -----------------------------
// TAKE USER INPUT
// -----------------------------
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on("data", (rawUserInput) => {

    // Enter key
    if (rawUserInput[0] === 0x0d) {
        console.log("\nUser selected");

        const selectedSong = songs[userSelectionIndex];

        playSong(SONGS_DIR + "/" + selectedSong);
    }

    // Ctrl + C
    else if (rawUserInput[0] === 0x03) {
        process.exit(0);
    }

    // Arrow keys
    else if (rawUserInput[0] === 0x1b) {

        // Check ESC [
        if (rawUserInput[1] === 0x5b) {

            // Up Arrow
            if (rawUserInput[2] === 0x41) {
                userSelectionIndex = Math.max(
                    0,
                    userSelectionIndex - 1
                );
            }

            // Down Arrow
            else if (rawUserInput[2] === 0x42) {
                userSelectionIndex = Math.min(
                    songs.length - 1,
                    userSelectionIndex + 1
                );
            }
        }
    }

    // Refresh song list
    listSongs(SONGS_DIR);
});