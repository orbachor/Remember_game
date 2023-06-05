document.addEventListener('DOMContentLoaded', function()
 { 
  var playerName;
  var cardsNumber;
  var flippedCards = [];
  var matchedCards = [];
  var gameTimer;
  var timerSeconds = 0;
  var isflipping = false;

  document.getElementById('start-button').addEventListener('click', function() 
  { 
    // on-click startbutton
    //get name and cards number
    playerName = document.getElementById('player-name').value; 
    cardsNumber = parseInt(document.getElementById('cards-number').value);

    if (playerName !== '' && !isNaN(cardsNumber) && cardsNumber >= 1 && cardsNumber <= 15) 
    { // if input ok.
      document.getElementById('home-container').style.display = 'none'; // hide home container
      startGame(); // func startGame
    }
    else
    {
      alert(' Add Player name , Number of cards between (1-15)');
    }
  });

  function startGame() 
  {
    createCards();
    document.getElementById('player-name-display').textContent = 'Player: ' + playerName; 
    document.getElementById('game-container').style.display = 'block'; // show game-container
    startTimer();

  }

  function shakeCards(card1, card2) {
    card1.classList.add('freeze'); // Add freeze class to card1
    card2.classList.add('freeze'); // Add freeze class to card2
  
    // Remove the freeze class and add the shake class after 2 seconds
    setTimeout(function() {
      card1.classList.remove('freeze');
      card2.classList.remove('freeze');
      card1.classList.add('shake');
      card2.classList.add('shake');
  
      // Remove the shake class and flip the cards back after 1 second
      setTimeout(function() {
        card1.classList.remove('shake');
        card2.classList.remove('shake');
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        isflipping = false;
      }, 1000);
    }, 500);
  }

  function createCards() 
  {
    var numbers = [];
  
    for (var i = 1; i <= cardsNumber; i++) 
    {
      numbers.push(i);
      numbers.push(i); // Push the number twice for a pair
    }
  
    shuffleArray(numbers);
  
    var gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
  
    for (var j = 0; j < numbers.length; j++) 
    {
      var card = document.createElement('div');
      card.className = 'card';
  
      var cardInner = document.createElement('div');
      cardInner.className = 'card-inner';
  
      var cardFront = document.createElement('div');
      cardFront.className = 'card-front';
  
      var cardBack = document.createElement('div');
      cardBack.className = 'card-back';
      var n = numbers[j];
      cardBack.style.backgroundImage = 'url(source/' + n + '.png';
  
      card.dataset.value = n;
  
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      gameBoard.appendChild(card); // end for of number[]
    }

    var cards = document.getElementsByClassName('card'); // get array o elements in class card

    for (var k = 0; k < cards.length; k++)
   {

    var flipCard = function() 
     { // add to card event of click
        var currentCard = this; // get card element

        // if card element doesnt has class flipped and flipped array smaller then 2
        if (!currentCard.classList.contains('flipped') && flippedCards.length < 2 && !isflipping)
        { 
          currentCard.classList.add('flipped'); // add class fliped to the card
          flippedCards.push(currentCard); // add card to flipped card array

          if (flippedCards.length === 2) 
          { // if there are 2 cards has been flipped
            var card1 = flippedCards[0]; // save card element
            var card2 = flippedCards[1];
            isflipping = true;
            if (card1.dataset.value === card2.dataset.value)  // if the both data value - value is the same
            {
              card1.removeEventListener('click', flipCard); // remove event
              card2.removeEventListener('click', flipCard); // remove event

              setTimeout(function() 
              {
                card1.classList.add('blue-light');
                card2.classList.add('blue-light');
                matchedCards.push(card1);
                matchedCards.push(card2);
                isflipping = false;
                if (matchedCards.length === cardsNumber * 2) 
                {
                  setTimeout(gameEnd, 1000);
                }
              }, 500);
              
            }
            else
            { isflipping = true; //cant open another card
              setTimeout(function() 
              {
                shakeCards(card1, card2);
                isflipping = true;
              }, 1000);
            }

            flippedCards = []; // reset flippedcard array
          }
        }
      }; // end of function 

      cards[k].addEventListener('click', flipCard);

    } // end for of cards

  } // end creat cards

  function shuffleArray(array) 
  { // switch random pairs
    for (var i = array.length - 1; i > 0; i--) 
    {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function startTimer() 
  { // set timer value to - gametimer
      gameTimer = setInterval(function() 
      {
       timerSeconds++;
       document.getElementById('timer').textContent = 'Timer: ' + timerSeconds + ' second';
      }, 1000);
  }

  function stopTimer() 
  { // stop intervals
    clearInterval(gameTimer);
  }
  function gameEnd() 
  { 
    stopTimer(); // stop timer interval
    var gameTime = timerSeconds; // get the final secounds amount
    var message = 'You done the game succesfuly! youre time is:' + gameTime + ' ' +'second.'; // make a message inlude time
    // hide game show game over container 
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-over-container').style.display = 'block';
    document.getElementById('game-over-message').textContent = message; // set the message to game-over-message
  }

  document.getElementById('restart-button').addEventListener('click', function() 
  { // add event to restart boutton
    resetGame();
  });

  function resetGame() 
{
    // reset args
    playerName = '';
    cardsNumber = 0;
    flippedCards = [];
    matchedCards = [];
    gameTimer = null;
    timerSeconds = 0;
//rest input value
    document.getElementById('player-name').value = '';
    document.getElementById('cards-number').value = '';

    document.getElementById('game-board').innerHTML = ''; // reset game board
    //show home hide game
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-over-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'flex';
 }

});
