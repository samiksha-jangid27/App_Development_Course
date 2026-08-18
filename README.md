# 📱 App Development

This repository contains my complete work for the **App Development** course.

It is maintained **lab-wise and date-wise** to keep a clear record of everything covered in class, including practicals, coding exercises, assignments, notes, and projects.

---

## 📚 Course Progress

| Lab    | Date        | Topic                          | Status      |
| ------ | ----------- | ------------------------------ | ----------- |
| Lab 01 | 18 Aug 2026 | CLI Music Player using Node.js | ✅ Completed |
| Lab 02 | —           | —                              | ⏳ Upcoming  |
| Lab 03 | —           | —                              | ⏳ Upcoming  |

---

# 🧪 Lab-wise Work

## Lab 01 — CLI Music Player

**Date:** 18 August 2026

### 🎯 Objective

Build a simple command-line music player using Node.js that can:

* Accept a music directory from the user
* Find MP3 files
* Display available songs
* Allow the user to select a song
* Play the selected song from the terminal

### 🛠️ Concepts Covered

* Node.js
* JavaScript
* `fs` module
* `path` module
* `child_process` module
* `spawn()`
* `process.stdin`
* File and directory handling
* Event-driven programming
* Error handling
* Asynchronous operations

### 📂 Lab Files

```text
Lab-01/
├── README.md
└── music-player.js
```

### ▶️ How to Run

```bash
cd Lab-01
node music-player.js
```

The application will ask for the path of the directory containing MP3 files.

Example:

```text
🎵 My Music Player
------------------
Enter songs directory path:
```

After entering the directory, the available songs will be displayed:

```text
🎵 My Music Player
------------------
1. song1.mp3
2. song2.mp3
3. song3.mp3

Enter song number:
```

Enter the corresponding number to play a song.

### 💡 Key Learning

In this lab, I learned how Node.js can be used to interact with the operating system through:

* File system operations
* Terminal input/output
* Child processes
* External system commands

The project uses macOS's `afplay` command to play MP3 files.

---

# 📅 Daily Learning Log

## 18 August 2026

### Lab 01

**Topic:** CLI Music Player

### What I Learned

* How to create a CLI application using Node.js
* How to read files from a directory
* How to filter MP3 files
* How to accept input through `process.stdin`
* How to create file paths using the `path` module
* How to start another system process using `spawn()`
* How to handle process events
* How to handle errors

### Practical Work

Built a command-line music player that allows the user to:

```text
Enter directory
      ↓
Read directory
      ↓
Find MP3 files
      ↓
Display songs
      ↓
Select song
      ↓
Play song
```

---

# 📊 Overall Progress

| Category       | Progress                |
| -------------- | ----------------------- |
| Labs Completed | 1                       |
| Labs Remaining | —                       |
| Projects       | 1                       |
| Assignments    | 0                       |
| Current Focus  | Node.js CLI Development |

---

# 🗂️ Repository Structure

```text
App-Development/
│
├── README.md
│
├── Lab-01/
│   ├── README.md
│   └── music-player.js
│
├── Lab-02/
│   └── ...
│
├── Lab-03/
│   └── ...
│
└── ...
```

---

# 🎯 Course Goals

* Learn application development fundamentals
* Understand how applications interact with the operating system
* Build practical applications
* Improve JavaScript and Node.js skills
* Learn application architecture and development practices
* Maintain clean and organized code
* Document every lab and class
* Build projects throughout the course

---

## 👩‍💻 Author

**Samiksha Jangid**

B.Tech CSE & AI
Rishihood University

---

> This repository is continuously updated after each class and lab to maintain a complete record of my App Development learning journey.
# App_Development_Course
