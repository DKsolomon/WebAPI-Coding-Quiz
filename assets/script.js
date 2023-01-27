var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>, <javascript>, <script>, <scripting> "],
        answer: "<script>",
},   
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var, let, Option 1 and 2, None of the above"],
        answer: "Option 1 and 2",
   
}, 
    {    
        question:"Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementbyId(), getElementsByClassName(), Option1 and 2, None of the above."],
        answer: "Option 1 and 2",
},   
    {        
        question: "how can a datatype be declared to be a constant type?",
        choices: ["const, var, let, constant"],
        answer:"const",
},   
    {
        question:"Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write(), console.log(), window.alert, All of the above"],
        answer: "All of the above",
    }];

    var quizEl = document.getElementById("quiz");
    var timerEl = document.getElementById("timer");
    var choicesEl = document.getElementById("choices");   
    var startBtn = document.getElementById("start");


    var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

