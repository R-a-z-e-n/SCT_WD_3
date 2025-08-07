const questions = [
  {
    type: "single",
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    type: "multi",
    question: "Which of the following are programming languages?",
    options: ["Python", "HTML", "JavaScript", "Google"],
    answer: ["Python", "JavaScript"]
  },
  {
    type: "text",
    question: "Fill in the blank: The process of finding and fixing bugs is called _______.",
    answer: "debugging"
  }
];

let currentQuestion = 0;
let score = 0;

const quizBox = document.getElementById("quiz-box");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");

function loadQuestion() {
  const q = questions[currentQuestion];
  quizBox.innerHTML = `<div class="question">${q.question}</div><div class="options">`;

  if (q.type === "single") {
    q.options.forEach(opt => {
      quizBox.innerHTML += `
        <label class="option">
          <input type="radio" name="answer" value="${opt}"> ${opt}
        </label>`;
    });
  } else if (q.type === "multi") {
    q.options.forEach(opt => {
      quizBox.innerHTML += `
        <label class="option">
          <input type="checkbox" name="answer" value="${opt}"> ${opt}
        </label>`;
    });
  } else if (q.type === "text") {
    quizBox.innerHTML += `
      <input type="text" id="text-answer" placeholder="Your answer here...">`;
  }

  quizBox.innerHTML += `</div>`;
}

function checkAnswer() {
  const q = questions[currentQuestion];
  let userAnswer;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
    userAnswer = selected.value;
    if (userAnswer === q.answer) score++;
  }

  if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked'))
      .map(el => el.value);
    if (arraysEqual(selected, q.answer)) score++;
  }

  if (q.type === "text") {
    const input = document.getElementById("text-answer").value.trim().toLowerCase();
    if (input === q.answer.toLowerCase()) score++;
  }
}

function arraysEqual(a, b) {
  return a.length === b.length && a.sort().every((val, index) => val === b.sort()[index]);
}

nextBtn.addEventListener("click", () => {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.innerHTML = "";
  nextBtn.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  resultDiv.textContent = `🎉 You scored ${score} out of ${questions.length}!`;
}

loadQuestion();
