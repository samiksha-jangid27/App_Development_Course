// Detect keyboard input directly from the terminal using raw mode.
// This allows us to detect special keys such as Ctrl+C,
// Up Arrow, and Down Arrow without waiting for the user to press Enter.

// Arrow keys are sent as escape sequences.
// ESC (0x1b) + [ (0x5b) + key code identifies the pressed arrow key.

process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    console.log(data.toString(),data)
    if (data[0] === 0x03) { // Ctrl+C
      process.exit(0)
    }
    if (data[2] === 0x41) {
      console.log("Up arrow pressed");
    } else if (data[2] === 0x42) {
      console.log("Down arrow pressed");
    }

})