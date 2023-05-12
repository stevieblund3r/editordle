window.onload = function () {
  var wordLabel = document.getElementById("word");
  var guessInput = document.getElementById("guess-input");
  var guessButton = document.getElementsByTagName("button")[0];
  var remainingGuessesLabel = document.getElementById("remaining-guesses");
  var messageLabel = document.getElementById("message");

  var wordList = ["Video",
    "Frame",
    "Cuter",
    "Adobe",
    "Vegas",
    "Sound",
    "Track",
    "Alpha",
    "Edits",
    "Clips",
    "Codec",
    "Panel",
    "Tools",
    "Merge",
    "Layer",
    "Timer",
    "Movie",
    "Proxy",
    "Color",
    "Speed",
    "Mixer",
    "Title",
    "Curve",
    "Noise",
    "Slide",
    "Ratio",
    "Light",
    "Trans",
    "Cross",
    "Grain",
    "Depth",
    "Cache",
    "Draft",
    "Wipes",
    "Scope",
    "Lasso",
    "Queue",
    "Brush",
    "Paste",
    "Ghost",
    "Scale",
    "Story",
    "Blink",
    "Delay",
    "Intro",
    "Codec",
    "Blend",
    "Keyer",
    "Match"];
  var targetWord = getRandomWord(wordList);
  var remainingGuesses = 6;
  var guessedLetters = [];

  wordLabel.textContent = "_ ".repeat(targetWord.length);
  remainingGuessesLabel.textContent = "Remaining Guesses: " + remainingGuesses;

  guessButton.onclick = checkGuess;

  function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }

  function checkGuess() {
    var guess = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guess.length === 1) {
      if (!guess.match(/[a-z]/i)) {
        messageLabel.textContent = "Invalid guess! Please enter a single letter.";
        return;
      }
    } else if (guess.length > 1) {
      if (guess === targetWord) {
        wordLabel.textContent = targetWord.split("").join(" ");
        wordLabel.style.color = "green";
        messageLabel.textContent = "Congratulations! You won!";
        guessButton.disabled = true;
        return;
      } else {
        messageLabel.textContent = "Wrong guess! Try again.";
        remainingGuesses--;
        remainingGuessesLabel.textContent = "Remaining Guesses: " + remainingGuesses;
        if (remainingGuesses === 0) {
          messageLabel.textContent = "You lost! The word was " + targetWord + ".";
          guessButton.disabled = true;
        }
        return;
      }
    }

    if (guessedLetters.includes(guess)) {
      messageLabel.textContent = "You already guessed that letter!";
      return;
    }

    guessedLetters.push(guess);

    var wordProgress = "";
    for (var i = 0; i < targetWord.length; i++) {
      var letter = targetWord[i];
      if (guessedLetters.includes(letter)) {
        wordProgress += letter + " ";
      } else {
        wordProgress += "_ ";
      }
    }

    wordLabel.textContent = wordProgress;

    if (!targetWord.includes(guess)) {
      remainingGuesses--;
      remainingGuessesLabel.textContent = "Remaining Guesses: " + remainingGuesses;
      if (remainingGuesses === 0) {
        messageLabel.textContent = "You lost! The word was " + targetWord + ".";
        guessButton.disabled = true;
      }
    }

    if (wordProgress.replace(/\s/g, '') === targetWord) {
      wordLabel.style.color = "green";
      messageLabel.textContent = "Congratulations! You won!";
      guessButton.disabled = true;
    }
  }
};
