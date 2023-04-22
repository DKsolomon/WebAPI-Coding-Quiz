var quiz = document.getElementById("quiz");
var timer = document.getElementById("timer");
var questionBox = document.getElementById("questions");
var multipleChoice = document.getElementById("choices");  
var checkAnswer = document.getElementById("check-answer");
var startBtn = document.getElementById("start");
var welcomeText = document.getElementById("starter-page");

var quizQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<javascript>", "<script>", "<scripting>"],
        answer: "<script>",
},   
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "Option 1 and 2", "None of the above"],
        answer: "Option 1 and 2",
   
}, 
    {    
        question:"Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementbyId()", "getElementsByClassName()", "Option 1 and 2", "None of the above."],
        answer: "Option 1 and 2",
},   
    {        
        question: "how can a datatype be declared to be a constant type?",
        choices: ["const", "var", "let", "constant"],
        answer:"const",
},   
    {
        question:"Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert", "All of the above"],
        answer: "All of the above",
    }];


    var currentQuestionIndex = 0;
    var timeLeft = 60;
    var timerInterval = 0;
    var penalty = 10;

    function startQuiz() {
        welcomeText.setAttribute("class", "hide");
        quiz.removeAttribute("class");

        grabQuestions();
        startTimer();
    }
    

    function startTimer() {
        timerInterval = setInterval(()  => {
            timeLeft--;
            timer.innerHTML =` ${timeLeft} seconds remaining`;
            if(timeLeft === 0 || currentQuestionIndex === quizQuestions.length) {
                clearInterval(timerInterval);
            } 
        
        }, 1000)
    }


    function grabQuestions() {
        var currentQuestion = quizQuestions[currentQuestionIndex];
        questionBox.textContent = currentQuestion.question

        multipleChoice.innerHTML = "";
       
        currentQuestion.choices.forEach(function(choice, i){
            var selectChoice = document.createElement("button");
            selectChoice.setAttribute("class", "choice");
            selectChoice.setAttribute("value", choice);
    
            selectChoice.textContent = i + 1 + ". " + choice;
        
            selectChoice.addEventListener('click', answerCheck);
            multipleChoice.appendChild(selectChoice);
        }); 
    }

    function answerCheck() {
        if (this.value !== quizQuestions[currentQuestionIndex].answer) {
            timer -= 10;
            
        checkAnswer.textContext = "Wrong!";
        checkAnswer.style.color = "red";
    } else {
        checkAnswer.textContext = "Correct!";
        checkAnswer.style.color = "green" 
    }

currentQuestionIndex++;

    if (currentQuestionIndex === quizQuestions.length) {
        showScore();
    } else {
        grabQuestions();
    }
    
    }

    function showScore() {
        clearInterval(timerInterval);

    }
        
    
    startBtn.addEventListener('click', startQuiz);
