// Set jumlah nyawa dan range angka baru
let maxLives = 10; // Mengubah jumlah nyawa menjadi 10
let minNumber = 1; // Angka minimal
let maxNumber = 100; // Angka maksimal
let randomNumber = generateRandomNumber(minNumber, maxNumber); // Menyesuaikan dengan range baru
let score = 0;
let lives = maxLives;

const livesElement = document.getElementById("lives");
const scoreElement = document.getElementById("score");
const resultElement = document.getElementById("result");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submitGuess");
const optionsDiv = document.getElementById("options");
const playAgainButton = document.getElementById("playAgain");
const homeButton = document.getElementById("home");

livesElement.textContent = lives;
scoreElement.textContent = score;

submitButton.addEventListener("click", () => {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess)) {
    resultElement.textContent = "Masukkan angka yang valid!";
    return;
  }

  if (userGuess === randomNumber) {
    score += calculateScore(lives); // Tambah skor berdasarkan sisa nyawa
    resultElement.textContent = `Selamat, kamu benar! Angka yang benar adalah ${randomNumber}.`;
    showOptions();
  } else {
    lives--;
    livesElement.textContent = lives;

    // Memberikan petunjuk kalau tebakan salah
    if (userGuess < randomNumber) {
      resultElement.textContent = "Salah, angka yang kamu tebak terlalu kecil! Coba lagi.";
    } else {
      resultElement.textContent = "Salah, angka yang kamu tebak terlalu besar! Coba lagi.";
    }

    if (lives === 0) {
      resultElement.textContent = `Game Over! Angka yang benar adalah ${randomNumber}.`;
      showOptions();
    }
  }

  guessInput.value = ""; // Kosongkan input setelah menebak
});

// Fungsi untuk menggenerate angka random dalam range tertentu
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk menghitung skor berdasarkan sisa nyawa
function calculateScore(lives) {
  return lives * 10; // Misalnya setiap nyawa bernilai 10 poin
}

// Fungsi untuk menampilkan opsi setelah game selesai
function showOptions() {
  submitButton.style.display = "none";
  optionsDiv.style.display = "block";
}

// Opsi "Main Lagi"
playAgainButton.addEventListener("click", () => {
  randomNumber = generateRandomNumber(minNumber, maxNumber);
  lives = maxLives;
  score += 10; // Skor bertambah 10 untuk setiap game baru
  livesElement.textContent = lives;
  scoreElement.textContent = score;
  resultElement.textContent = "";
  optionsDiv.style.display = "none";
  submitButton.style.display = "block";
  submitButton.style.margin = "20px auto"; // Agar tetap di tengah
  guessInput.focus();
});

// Opsi "Ke Home"
homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
