// FUNCTION:: Get elements by id
const el = (elm) => document.getElementById(elm);
// FUNCTION:: Get elements by queryselector
const qs = (elm) => document.querySelector(elm);
// FUNCTION:: Get elements by queryselectorAll
const qsa = (elm) => document.querySelectorAll(elm);

// Get all DOM elements
const [answerElements, container, errorContainer] = [
  qsa(".answer"),
  el("container"),
  el("error"),
];

let currentIndex = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
  let currentQuestion = questions[currentIndex];
  // Deselect answer
  deselectAnswer();
  el("show-no-of-qst").innerHTML = `${currentIndex + 1} of ${questions.length}`;
  question.innerText = currentQuestion.question;
  a_text.innerText = currentQuestion.a;
  b_text.innerText = currentQuestion.b;
  c_text.innerText = currentQuestion.c;
  d_text.innerText = currentQuestion.d;
}

submitBtn.addEventListener("click", () => {
  let selected = getSelectedAnswer();
  if (selected) {
    let correctAns = questions[currentIndex].correct;
    if (selected === correctAns) {
      score++;
    }
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
      errorContainer.classList.remove("active");
    } else {
      container.innerHTML = `<h2>Your Questions are done!</h2>
            <button class="btn" id="reloadBtn" onclick="location.reload()">RELOAD</button>
            <p>You have scored ${score}/${questions.length} questions</p>
        `;
    }
  } else {
    errorContainer.classList.add("active");
    errorContainer.innerHTML = `
      <div class=" pt-1 pb-1 danger-color danger-bg-soft border-left-3 border-danger flex-align-center">
  <i class='feather-alert-circle ml-2 mr-1 text-16'></i>
  <span>Please select an answer</span></div>
    
      `;
  }
});

// Deselect previously selected answer when a new question is loaded.
function deselectAnswer() {
  answerElements.forEach((answerElement) => {
    answerElement.checked = false;
  });
}

// Get the selected answer
function getSelectedAnswer() {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });
  return answer;
}
