const questions = [
    {
        question: "Hansı HTML teqi hiperlink (keçid) yaratmaq üçün istifadə olunur?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "Ən böyük başlıq üçün hansı HTML teqi istifadə edilir?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<heading>", correct: false },
            { text: "<title>", correct: false }
        ]
    },
    {
        question: "Şəkilin ünvanını göstərmək üçün hansı atribut istifadə olunur?",
        answers: [
            { text: "src", correct: true },
            { text: "link", correct: false },
            { text: "img", correct: false },
            { text: "href", correct: false }
        ]
    },

    //css

    {
        question: "Mətnin rəngini dəyişmək üçün hansı CSS xüsusiyyəti istifadə olunur?",
        answers: [
            { text: "font-style", correct: false },
            { text: "color", correct: true },
            { text: "background-color", correct: false },
            { text: "text-decoration", correct: false }
        ]
    },
    {
        question: "Hansı ölçü vahidi kök (root) font ölçüsünə əsaslanır?",
        answers: [
            { text: "px", correct: false },
            { text: "em", correct: false },
            { text: "rem", correct: true },
            { text: "%", correct: false }
        ]
    },
    {
        question: "Elementin daxilindəki boşluğu idarə edən xüsusiyyət hansıdır?",
        answers: [
            { text: "padding", correct: true },
            { text: "margin", correct: false },
            { text: "border", correct: false },
            { text: "gap", correct: false }
        ]
    },

    //js

    {
        question: "Blok səviyyəli dəyişən yaratmaq üçün hansı açar söz istifadə olunur?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "define", correct: false }
        ]
    },

    {
        question: "JavaScript-də 5 + '5' əməliyyatının nəticəsi nədir?",
        answers: [
            { text: "10", correct: false },
            { text: "'55'", correct: true },
            { text: "Xəta", correct: false },
            { text: "5", correct: false }
        ]
    }



];

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = 'none';
    nextButton.style.display = 'block';
    nextButton.textContent = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showResult() {
    resetState();
    questionText.style.display = 'none';
    answerButtons.style.display = 'none';
    nextButton.style.display = 'none';

    resultContainer.style.display = 'block';
    scoreSpan.textContent = score;
    totalQuestionsSpan.textContent = questions.length;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

restartButton.addEventListener('click', () => {
    questionText.style.display = 'block';
    answerButtons.style.display = 'grid';
    startQuiz();
});

startQuiz();