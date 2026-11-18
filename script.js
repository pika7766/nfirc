const questions = [
  {
    question: "HTML 中用來連結外部 CSS 的標籤是什麼？",
    options: ["<script>", "<style>", "<link>", "<meta>"],
    answer: 2
  },
  {
    question: "CSS 中哪一個選擇器會選取所有 class 為 card 的元素？",
    options: ["#card", ".card", "card", "*card"],
    answer: 1
  },
  {
    question: "JavaScript 要印出訊息到主控台，使用哪個方法？",
    options: ["console.print()", "console.log()", "print()", "log.console()"],
    answer: 1
  },
  {
    question: "哪一個 CSS 屬性可以將子元素分成網格？",
    options: ["grid-template-columns", "flex-direction", "text-align", "position"],
    answer: 0
  },
  {
    question: "哪個 HTTP 狀態碼代表「請求成功」？",
    options: ["404", "500", "302", "200"],
    answer: 3
  }
];

let currentIndex = 0;
let score = 0;
let selectedAnswer = null;

const quizCard = document.querySelector("#quizCard");
const resultCard = document.querySelector("#resultCard");
const questionElement = document.querySelector("#question");
const optionsElement = document.querySelector("#options");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");

function renderQuestion() {
  const item = questions[currentIndex];
  selectedAnswer = null;
  questionElement.textContent = item.question;
  optionsElement.replaceChildren();
  nextButton.disabled = true;
  nextButton.textContent = currentIndex === questions.length - 1 ? "查看結果" : "下一題";
  progressText.textContent = `第 ${currentIndex + 1} 題／共 ${questions.length} 題`;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;

  item.options.forEach((text, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = text;
    button.addEventListener("click", () => selectAnswer(button, index));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(button, index) {
  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("selected");
  });
  button.classList.add("selected");
  selectedAnswer = index;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) return;
  if (selectedAnswer === questions[currentIndex].answer) score++;

  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizCard.hidden = true;
  resultCard.hidden = false;
  progressText.textContent = "測驗完成";
  progressBar.style.width = "100%";
  document.querySelector("#score").textContent = score;

  if (score === 5) {
    document.querySelector("#resultTitle").textContent = "前端高手！";
    document.querySelector("#resultText").textContent = "全部答對，你對基礎概念掌握得非常扎實。";
  } else if (score >= 3) {
    document.querySelector("#resultTitle").textContent = "表現不錯！";
    document.querySelector("#resultText").textContent = "你已經具備不錯的基礎，再加強細節就會更進一步。";
  } else {
    document.querySelector("#resultTitle").textContent = "繼續加油！";
    document.querySelector("#resultText").textContent = "從 HTML、CSS 與 JavaScript 基礎開始練習，下一次一定更好。";
  }
}

restartButton.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultCard.hidden = true;
  quizCard.hidden = false;
  renderQuestion();
});

renderQuestion();
