var startButton = document.getElementById('start-btn');
var questionContainer = document.querySelector('.question-container');
var answers = document.querySelectorAll('.answer');
var timeDisplay = document.getElementById('countdown');
var scoreDisplay = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var saveButton = document.getElementById('save-btn');

var currentQuestionIndex = 0;
var score = 0;
var timeInSeconds = 60;

var quizQuestions = [{
  question: "How many Infinity Stones are in there?",
  answers: {
    a: "6",
    b: "7",
    c: "10",
    d: "5",
  },
  correctAnswer: 'a'
},
{
  question: "Who is Tony Stark?",
  answers: {
    a: "Hawkeye",
    b: "Hulk",
    c: "Ironman",
    d: "Spiderman",
  },
  correctAnswer: "c"
},
{
  question: "Who type of Doctor is Doctor-Strange?",
  answers: {
    a: "HeartSurgeon",
    b: "Neurosurgeon",
    c: "Cardiosurgeon",
    d: "Plasticsurgeon",
  },
  correctAnswer: 'b'
}];

function startGame() {
  startButton.disabled = true;
  askQuestion(currentQuestionIndex);
  startTimer();
}

function askQuestion(index) {
  var question = quizQuestions[index];
  if (!question) {
    endGame();
    return;
  }

  document.getElementById('question').textContent = question.question;

  answers.forEach((answer, i) => {
    var answerKey = Object.keys(question.answers)[i];
    answer.dataset.answer = answerKey;
    answer.textContent = answerKey.toUpperCase() + ". " + question.answers[answerKey];
    answer.addEventListener('click', () => checkAnswer(answer, question.correctAnswer));
 
  });
}

function checkAnswer(selectedOption, correctAnswer) {
  var selectedAnswer = selectedOption.dataset.answer;
  if (selectedAnswer === correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
  } else {
    timeInSeconds -= 10;
    if (timeInSeconds < 0) {
      timeInSeconds = 0;
    }
  }

  currentQuestionIndex++;
  askQuestion(currentQuestionIndex);
};

function startTimer() {
  var timerInterval = setInterval(() => {
    timeDisplay.textContent = timeInSeconds;
    if (timeInSeconds === 0) {
      clearInterval(timerInterval);
      endGame();
    } else {
      timeInSeconds--;
    }
  }, 1000);
};

function endGame() {
  questionContainer.style.display = 'none';
  scoreDisplay.textContent = score;
  initialsInput.style.display = 'block';
  saveButton.style.display = 'block';
}

startButton.addEventListener('click', startGame);

var highScores = [];

function saveScore() {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    highScores.push({ initials: initials, score: score });
    highScores.sort((a, b) => b.score - a.score);
    updateHighScores();
    initialsInput.value = "";
  }
}


function updateHighScores() {
  var highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = "";
  highScores.forEach(function (item, index) {
    var listItem = document.createElement("li");
    listItem.textContent = `${item.initials}: ${item.score}`;
    highScoresList.appendChild(listItem);
  });

  var highScoresContainer = document.querySelector(".high-scores-container");
  highScoresContainer.style.display = "block";
}

function clearHighScores() {
  highScores = [];
  updateHighScores();
}

saveButton.addEventListener("click", saveScore);

var clearScoresBtn = document.getElementById("clear-scores-btn");
clearScoresBtn.addEventListener("click", clearHighScores);
