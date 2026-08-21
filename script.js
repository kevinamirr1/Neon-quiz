const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startBtn = document.getElementById("startBtn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progressBar");
const timerEl = document.getElementById("timer");
const quizEl = document.getElementById("quiz");
const progressContainer = document.querySelector(".progress");

startBtn.onclick = () => {
  startBtn.style.display = "none";
  quizEl.style.display = "block";
  progressContainer.style.display = "block";
  timerEl.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  if (currentQuestion < questions.length) {
    questionEl.textContent = questions[currentQuestion].question;
    optionsEl.innerHTML = "";
    questions[currentQuestion].options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsEl.appendChild(button);
    });
    updateProgress();
    resetTimer();
  }
}

function checkAnswer(selected) {
  clearInterval(timer);
  if (selected === questions[currentQuestion].answer) {
    score++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong answer.");
  }
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
};

function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  progressBar.style.width = "100%";
  timerEl.style.display = "none";
  resultEl.textContent = `🎉 You scored ${score} out of ${questions.length}!`;
}

function updateProgress() {
  const progress = ((currentQuestion) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
      nextBtn.style.display = "block";
    }
  }, 1000);
}
