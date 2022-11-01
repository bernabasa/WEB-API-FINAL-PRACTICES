var Questions = [
    {
        Title: "Who is the first presedant of The United States of America?",
        Choices: ["Barck Obama",
                "Clinton",
                "George Washington",
                "Thomas Jefferson"],
        Answer: "George Washington"
    },
    {
        Title: "How many amendments does the Constitution have?",
        Choices:["30",
                "27",
                "58",
                "74"],
        Answer: "27"
    },
    {
        Title: "How many U.S. Senators are there?",
        Choices: ["50",
                "21",
                "40",
                "100"],

        Answer: "100"
    },
];
var questionIndex = 0;
var score = 0;
var timeLeft = 60;
var timePenality = 10;
var holdInterval = 0;
var questionDiv = document.querySelector("#questionDiv");
var Top = document.querySelector("#Top");
var currentTimer = document.querySelector("#currentTimer");
var Quiz = document.querySelector("#quiz");
var quizText = document.querySelector("#quizText");
var startButton = document.querySelector("#startButton");
var quizInfo = document.querySelector("#questInfo");

startButton.addEventListener("click", function() {
    Top.hidden;
    timeLeft.hidden;
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            timeLeft --;
            currentTimer.textContent = "Timer: " + timeLeft;
            if(timeLeft === 0) {
                clearInterval(holdInterval);
                currentTimer.textContent= "Time's Up!";

            }
        },1000);
    }
    questionStart(questionIndex);
    
});

var questionStart = function(questionIndex) {
    questionDiv.innerHTML= "";
    quizText.innerHTML= "";

    var question = Questions[questionIndex].Title;
    var Choices = Questions[questionIndex].Choices;
    quizText.textContent = question;

    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "btn");
    choiceBtn.textContent = Choices;

    // split each choices into it's pwn button

    Choices.forEach(function(newItem) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "btn");
        choiceBtn.textContent = newItem;
        questionDiv.appendChild(choiceBtn);
        choiceBtn.addEventListener("click", (compareSelection));
    })
};

 var compareSelection = function(event) {
    var element = event.target;
    if(element.matches(".btn")) {
        if(element.textContent == Questions[questionIndex].Answer) {
            score++;
        } else {
            timeLeft = timeLeft - timePenality;

        }
    }
    questionIndex++;
    if (questionIndex >= Questions.length) {
        endQuiz();
    } else {
        questionStart(questionIndex);
    }
 };
//

var endQuiz = function() {
    questionDiv.innerHTML = "";
    quizText.innerHTML = "";
    currentTimer.innerHTML = "";

    Top.hidden = false;
    Top.textContent = "Time's Up!";
    Top.setAttribute("class", "titleTwo");
    if(timeLeft >= 0) {
        var timeRemaining = timeLeft;
        //stop timer
        clearInterval(holdInterval);
        quizText.setAttribute("class", "message");
        quizText.textContent = "Your final score is: " + timeRemaining;
        quizInfo.appendChild(quizText)
    }
    questionDiv.setAttribute("class", "form");
            var createLabel = document.createElement("label");
            createLabel.setAttribute("id", "label");
            createLabel.textContent = "Enter initials: ";
    
            questionDiv.appendChild(createLabel);
    
            var createInput = document.createElement("input");
            createInput.setAttribute("type", "text");
            createInput.textContent = "";
    
            questionDiv.appendChild(createInput);
    
            var submit = document.createElement("button");
            submit.setAttribute("type", "submit");
            submit.setAttribute("id", "submit");
            submit.setAttribute("class", "btn");
            submit.textContent = "Save Highscore!";
    
            questionDiv.appendChild(submit);
     
            submit.addEventListener("click", function(){
                var userInitials = createInput.value;
                // create object for final score
                var finialScore = {
                    initials: userInitials,
                    score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = []
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finialScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            location.replace("./highscores.html");
            })

};






  
