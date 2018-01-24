/*jshint maxerr:1000 */
            
/*Database of JavaScript Array methods*/
let methods = [
  {method: "filter()",
    definition: "The ________ method creates a new array with all elements that pass the test implemented by the provided function." ,
    status: false,
    correct: false},
  {method: "find()",
    definition: "The _______ method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned." ,
    status: false,
    correct: false},
  {method: "join()",
    definition: "The ______ method joins all elements of an array (or an array-like object) into a string and returns this string.",
    status: false,
    correct: false},
  {method: "push()",
    definition: "The ______ method adds one or more elements to the end of an array and returns the new length of the array.",
    status: false,
    correct: false},
  {method: "reduce()",
    definition: "The _______ method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.",
    status: false,
    correct: false},
  {method: "shift()",
    definition: "The ________ method removes the first element from an array and returns that removed element. This method changes the length of the array.",
    status: false,
    correct: false},
  {method: "slice()",
    definition: "The _______ method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.",
    status: false,
    correct: false},
  {method: "splice()",
    definition: "The ________ method changes the contents of an array by removing existing elements and/or adding new elements.",
    status: false,
    correct: false},
  {method: "toString()",
    definition: "The _________ method returns a string representing the specified array and its elements.",
    status: false,
    correct: false},
  {method: "map()",
    definition: "The _________ method creates a new array with the results of calling a provided function on every element in the calling array.",
    status: false,
    correct: false},
  {method: "pop()",
    definition: "The _________ method removes the last element from an array and returns that element. This method changes the length of the array.",
    status: false,
    correct: false}];
 
//Start quiz
$(function(){
  $('.beginButton').click(function(event){
    event.preventDefault();
    toggleHiddenClass('.startSection, .quizSection');
    let indexCounter = countCorrectAnswersAttemptedQuestions(methods, 'status');
    let choiceIndices = generateChoices(indexCounter);
    renderQuestionChoices(indexCounter, choiceIndices);
    $(".labelContainer input:radio[name = 'choice']:first").focus();
  });
}); 

//Toggle a 'hidden' class to an element or elements
function toggleHiddenClass(classToToggle){
  $(classToToggle).toggleClass("hidden");
}

//Render a question and choices
function renderQuestionChoices(selectedIndex, choiceIndices) {
  $('.question').html(`${methods[selectedIndex].definition}`);
  $('.choicesContainer').empty();
  choiceIndices.map(function(ind){
    $('.choicesContainer').append(`<label class="labelContainer cont-${ind}" aria-controls = "method-choice">
        <input type = "radio" name ="choice" 
              value = ${methods[ind].method} 
              id = ${methods[ind].method}>
        <code class ="jsMethods">${methods[ind].method}</code>
        <div role = "region" id = "method-choice" aria-live = "plotie"></div>
        </label><br>`);   
  });
}

//Clear the information if any of the choices is selected
function checkIfOptionsSelected(){
  $('.choicesContainer').on('click','input',function(event){
     $('.submitButton').attr('disabled',false);
     $('.info').html('');
     $('.info').attr('hidden', true);
  });
}
$(checkIfOptionsSelected);

//Determine if selected choice is correct, display result if final question
function determineSelectedChoiceDisplayQuizResults(){
  $('.submitButton').click(function(event){
    event.preventDefault();
    determineSelectedChoice();
    $('.nextButton').focus();
  });
}
$(determineSelectedChoiceDisplayQuizResults);

//Count correct answers, attempted questions from the database
function countCorrectAnswersAttemptedQuestions(arrayToSearch, key) {
  let filteredArray = [];
  let lengthOfFillteredArray = 0;
  arrayToSearch.reduce(function(tally, obj){
    if (obj[key]) {
      filteredArray.push(obj);
      lengthOfFillteredArray = filteredArray.length;
    }
  },{});
  return lengthOfFillteredArray; 
}

// Check if the correct answer was selected or not
function determineSelectedChoice(){
  let selectedOption = $("input:checked").val();
  let selectedIndex = findIndexByKeyValue(methods, "method", selectedOption);
  let indexCounter = countCorrectAnswersAttemptedQuestions(methods, 'status');
  let correctAnswer = methods[indexCounter].method;
  $('.info').attr('hidden', false);
  if(selectedIndex !== null ) {
    $('.submitButton').attr('disabled',true);
    $('.nextButton').attr("disabled", false);
    $('.labelContaner label, .labelContainer input').attr('disabled',true);
    if (selectedOption === correctAnswer){
      methods[indexCounter].correct = true;

      $('.info').html("Good job! You got that right!");
      $('.info').css("color","blue");
    } else {
      $('.info').html(`Sorry, the correct answer was <em>${correctAnswer}</em>`);
      $('.info').css("color","red");
    }
    indexCounter = countCorrectAnswersAttemptedQuestions(methods, 'status');
    correctScore = countCorrectAnswersAttemptedQuestions(methods, "correct");
    let incorrectScore = indexCounter + 1 - correctScore;
    $('.score span').html(`${correctScore} correct, ${incorrectScore} incorrect`);
    $('.labelContainer input, .labelContainer label').attr('disabled',true);
    methods[indexCounter].status = true;
    
  } else {
    $('.info').html("Please choose one of the JavaScript methods first!");
    $('.labelContainer')[0].focus();
    $('.info').css("color","red");
  }
}

// Find index of the selected choice from the database 
function findIndexByKeyValue(arrayToSearch, key, valueToSearch) {
  for (var i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i][key] === valueToSearch) {
      return i;
    }
  }
  return null;
}

// Next question next question and choices
function renderNextQuestion(){
  $('.nextButton').click(function(event){
    event.preventDefault();
    displayQuizResult();
    let indexCounter = countCorrectAnswersAttemptedQuestions(methods, 'status');
    let choiceIndices = generateChoices(indexCounter);
    renderQuestionChoices(indexCounter, choiceIndices);
    $(this).attr("disabled", true);
    $('.submitButton').attr("disabled", false);
    $(".labelContainer input:radio[name = 'choice']:first").focus();
    $('.info').html("");
    $('.info').attr('hidden', true);
    indexCounter = countCorrectAnswersAttemptedQuestions(methods, 'status');
    $('.status span').html(indexCounter + 1);
  });
}
$(renderNextQuestion);

// Display the final score
function displayQuizResult(){
  let indexCounter = countCorrectAnswersAttemptedQuestions(methods, 'status');
  if (indexCounter === 10){
    toggleHiddenClass('.quizSection, .resultSection');
    let questionsTried = countCorrectAnswersAttemptedQuestions(methods, 'status');
    let correctScore = countCorrectAnswersAttemptedQuestions(methods, 'correct');
    $('.resultSection').append(`<label class="lblResult">You answered  ${correctScore} 
        out of ${questionsTried} questions correctly!</label><br>`);
    $('.resultSection').append(`<button class ="retakeButton">Retake</>`);
    $('.resultSection .retakeButton').focus();
  }
}

// Restart the quiz
function restartQuiz(){
  $('.resultSection').on('click', '.retakeButton', function(event){
    window.location.reload(true);
    $('.beginButton').focus();
  });
}   
$(restartQuiz);

// Generate random indices
function generateChoices(currentIndex){
  let choices = [];
  let bucket = Array.from(Array(10).keys());
  bucket.splice(currentIndex,1);
  choices.push(currentIndex);
  for(let i = 0; i <= 2; i++){
    choices.push(getRandomFromBucket(bucket));
  }
  return choices.sort(function() { return 0.5 - Math.random() });
}

// Generate random indices without replacement
function getRandomFromBucket(bucket) {
   let randomIndex = Math.floor(Math.random()*bucket.length);
   return bucket.splice(randomIndex, 1)[0];
}

// Handle focus on any of the choices
function handleFocus(){
  $('.choicesContainer').on('focus','input', function(){
    $(this).parent('label').addClass('focused');
  });
  
  $('.choicesContainer').on('blur','input', function(){
    $(this).parent('label').removeClass('focused');
  });
}       
$(handleFocus);     
