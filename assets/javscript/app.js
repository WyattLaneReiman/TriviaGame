var triviaQuestions = [{
	question: "Who was not a character?",
	answerList: ["Chel", "Quami", "Tulio", "Miguel"],
	answer: 1
},{
	question: "Which animal is it the year of?",
	answerList: ["Jaguar", "Dragon", "Shark", "Bear"],
	answer: 0
},{
	question: "Who always wanted to go back to Spain?",
	answerList: ["Tulio", "Miguel", "Chief", "Altivo"],
	answer: 0
},{
	question: "What jewelry does Chel take from the pile of gold?",
	answerList: ["Necklace", "Bracelet", "Earrings", "Crown"],
	answer: 2
},{
	question: "How did Miguel and Tulio escape from the Spanish soldiers who were persuing them?",
	answerList: ["They swam away.", "They ran away.", "They paid them.", "They jumped into barrels."],
	answer: 3
},{
	question: "What is in the barrels that Tulio and Miguel jump into?",
	answerList: ["Pickles", "Rum", "Apples", "Water"],
	answer: 0
},{
	question: "What did Miguel and Tulio pretend to be, once they arrived in El Dorado?",
	answerList: ["Pirates", "Gods", "Drunk", "Civilians"],
	answer: 1
},{
	question: "What is the horses name?",
	answerList: ["Jaxon", "Herbert", "Altivo", "Khan"],
	answer: 2
},{
	question: "When was the city of El Dorado made?",
	answerList: ["10,000 years ago", "1000 years ago", "15,000 years ago", "100 years ago"],
	answer: 1
},{
	question: " At the end of the movie, what is the only gold Tulio and Miguel are left with?",
	answerList: ["Earrings", "A treasure chest", "All of the treasure", "Altivo's horseshoes"],
	answer: 3
}];

var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    clickSound: new Audio("assets/sounds/button-click.mp3"),
    gameHTML: "",
    questionsArray: [
                    "Who was not a character?", "Which animal is it the year of?", "Who always wanted to go back to Spain?", "What Jewelry does Chel take from the pile of gold?", "How did Miguel and tulio escape from the Spanish soldiers who were persuing them?", "What is in the barrels that Tulio and Miguel jump into?", "What did Miguel and Tulio pretend to be once they arrived in El Dorado?", "What is the horses name?", "When was the city of El Dorado made?", "At the end of the movie, what is the only gold Tulio and Miguel are left with?"],
    answerArray: [
                  ["Chel", "Quami", "Tulio", "Miguel"], ["Jaguar", "Dragon", "Shark", "Bear"], ["Tulio", "Miguel", "Chief", "Altivo"], ["Necklace", "Bracelet", "Earrings", "Crown"], ["They swam away.", "They ran away.", "They paid them.", "They jumped into barrels."], ["Pickles", "Rum", "Apples", "Water"] ["Pirates", "Gods", "Drunk", "Civilians"], ["Jaxon", "Herbert", "Altivo", "Khan"], ["10,000 years ago", "1000 years ago", "15,000 years ago", "100 years ago"], ["Earrings", "A treasure chest", "All of the treasure", "Altivo's horseshoes"]],
    correctAnswers: [
                    "B. Quami", "A. Jaguar", "A. Tulio", "C. Earrings", "D. They jumped into barrels.", "A. Pickles", "B. Gods", "C. Altivo", "B. 1000 years ago", "D. Altivo's horseshoes"
                    ],
    imageArray: [
                "<img class='center-block img-right' src='assets/images/ibjjf-1996.png'>", "<img class='center-block img-right' src='assets/images/adcc.png'>", "<img class='center-block img-right' src='assets/images/japan.jpg'>", "<img class='center-block img-right' src='assets/images/mata-leon.jpg'>", "<img class='center-block img-right' src='assets/images/passing-guard.jpeg'>"],
    clock: "",
    questionCounter: 0,
    timeCounter: 20,
  };
  
  
  //FUNCTIONS
  //===========================================
  function startScreen(){
    //Create the start button
    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Luta!</a></p>";
    //Add Start button to main-area
    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){
    trivia.clock = setInterval(twentySeconds, 1000);
    function twentySeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 20;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 4000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 20;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
    $(".main-area").html(trivia.gameHTML);
  }
  
  
  //MAIN PROCESS
  //===========================================
  startScreen();
  
  //start-button click
  $("body").on("click", "#startBtn", function(event){
      event.preventDefault();
      trivia.clickSound.play();
      generateHTML();
  
      timer();
  }); // Closes start-button click
  
  $("body").on("click", ".answer", function(event){
      trivia.clickSound.play();
    //If correct answer
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }
    //If incorrect ansewr
      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); // Close .answer click
  
  //reset-button click
  $("body").on("click", ".reset-button", function(event){
      trivia.clickSound.play();
      resetGame();
  }); // Closes reset-button click
  