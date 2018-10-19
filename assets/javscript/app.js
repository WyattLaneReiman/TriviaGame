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

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
