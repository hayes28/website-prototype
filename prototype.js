const API_KEY = 'ojjT8Vt4qgSkljqr3Ji8KWtsKXPLWtPDN3iHSyES';
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

async function fetchQuizData () {
  const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&tags=JavaScript&limit=5`);
  const data = await response.json();
  return data;
}

function showQuiz (quizData) {
  const output = [];

  quizData.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    const answerKeys = ['answer_a', 'answer_b', 'answer_c', 'answer_d', 'answer_e', 'answer_f'];

    answerKeys.forEach((key) => {
      if (currentQuestion.answers[key]) {
        answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${key}">
                        ${currentQuestion.answers[key]}
                    </label>`
        );
      }
    });

    output.push(
            `<div class="question">${currentQuestion.question}</div>
             <div class="answers">${answers.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults (quizData) {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let correct = 0;

  quizData.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (currentQuestion.correct_answers[userAnswer + '_correct'] === 'true') {
      correct++;
    }
  });

  resultsContainer.innerHTML = `You got ${correct} out of ${quizData.length} correct.`;
}

async function init () {
  const quizData = await fetchQuizData();
  showQuiz(quizData);
  submitButton.addEventListener('click', () => showResults(quizData));
}

init();
