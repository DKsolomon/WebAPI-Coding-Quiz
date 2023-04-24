var quiz = document.getElementById("quiz");
var timer = document.getElementById("timer");
var questionBox = document.getElementById("questions");
var multipleChoice = document.getElementById("choices");  
var checkAnswer = document.getElementById("check-answer");
var score = document.getElementById("score");
var results = document.getElementById("results-page")
var initials = document.getElementById("initialInput")
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var submitMsg = document.getElementById("sbmtmsg")
var highScore = document.getElementById("high-score-page");
var clear = document.getElementById("clear");
var back = document.getElementById("back");
var hsPage = document.getElementById("high-score-page");
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
    var quizScore = timeLeft
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    

    function startQuiz() {
        welcomeText.style.display = "none";
        results.style.display = "none";
        quiz.style.display = "block";
        highScore.style.display = "none";

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

            if (timeLeft <= 0) {
                showScore();
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
            timeLeft -= 10;
        checkAnswer.textContent = "Wrong!";
        checkAnswer.style.color = "red";
    } else {
        checkAnswer.textContent = "Correct!";
        checkAnswer.style.color = "green" 
    }

currentQuestionIndex++;

    if (currentQuestionIndex === quizQuestions.length) {
        showScore();
    } else {
        grabQuestions();
    }
    
    }

    function showScore(event) {
        event.preventdefault();
        clearInterval(timerInterval);
       quiz.style.display = "none";
       results.style.display = "block";
       highScore.style.display = "none";

       score.textContent = timeLeft;

       if (initials !== "") {
        
        var initialStor = initials.value.trim();
        var newScore = {
            score: timeLeft,
            initials: initialStor,
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        submitMsg.textContent = "Submitted!"
       }
    }

    function highScorePage(event) {
         event.preventdefault();
         
        welcomeText.style.display = "none"
        quiz.style.display = "none";
        results.style.display = "none";
        highScore.style.display = "block";


       
        highscores.sort(function(a, b){
            return b.score - a.score;
        });
    
        highscores.forEach(function(score){
          
            var li = document.createElement("li");
            li.textContent = score.initials + " - " + score.score;
          
            var ol = document.getElementById("highscore");
            ol.appendChild(li);
        });
    }
    
    
    function clearHS (event) {
        event.preventdefault();

        window.localStorage.removeItem("highscores");
        window.location.reload();
    }

    function backToStart(event) {
     welcomeText.style.display = "block";
        quiz.style.display = "none";
        results.style.display = "none";
        highScore.style.display = "none";

       
    }
    

        
    submitBtn.addEventListener('click', showScore);
    
    startBtn.addEventListener('click', startQuiz);

    hsPage.addEventListener('click', highScorePage);

    back.addEventListener('click', backToStart);
   
    clear.addEventListener('click', clearHS);

 
clearHS();
backToStart();