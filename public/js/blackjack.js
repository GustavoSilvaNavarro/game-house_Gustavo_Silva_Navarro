/**
 * @license
 * ========================================================================
 * ScrollPos-Styler v0.7.1
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */
 var ScrollPosStyler=function(t,r){"use strict";var o=0,a=!1,i=1,n="sps",c=t.getElementsByClassName(n),f="sps--abv",m="sps--blw",u="data-sps-offset";function l(s){var e=[];o=r.pageYOffset;for(var t=0;c[t];++t){var a=c[t],n=a.getAttribute(u)||i,l=a.classList.contains(f);(s||l)&&n<o?e.push({element:a,addClass:m,removeClass:f}):(s||!l)&&o<=n&&e.push({element:a,addClass:f,removeClass:m})}return e}function v(s){for(var e=0;s[e];++e){var t=s[e];t.element.classList.add(t.addClass),t.element.classList.remove(t.removeClass)}a=!1}var s={init:function(s){a=!0,s&&(s.spsClass&&(n=s.spsClass,c=t.getElementsByClassName(n)),i=s.scrollOffsetY||i,f=s.classAbove||f,m=s.classBelow||m,u=s.offsetTag||u);var e=l(!0);0<e.length?r.requestAnimationFrame(function(){v(e)}):a=!1}};return t.addEventListener("DOMContentLoaded",function(){r.setTimeout(s.init,1)}),r.addEventListener("scroll",function(){if(!a){var s=l(!1);0<s.length&&(a=!0,r.requestAnimationFrame(function(){v(s)}))}}),s}(document,window);

//BLACK JACK GAME
//Savind info
let blackjackGameDB = {
    you: {scoreSpan: '#blackjackGame__yourResult', div: '#blackjackGame__yourBox', score: 0},
    house: {scoreSpan: '#blackjackGame__houseResult', div: '#blackjackGame__houseBox', score: 0},
    cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    cardsValues: {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    wins: 0,
    losses: 0,
    draws: 0,
    isStand: false,
    turnIsOver: false
};

//ACCESS TO OBJECT
const You = blackjackGameDB.you;
const House = blackjackGameDB.house;

//GENERATING SOUNDS
const hitSound = new Audio('../public/sounds/swish.m4a');
const winSound = new Audio('../public/sounds/cash.mp3');
const loseSound = new Audio ('../public/sounds/aww.mp3');


//HIT BUTTON
const hitButtonAction = () => {
    if((blackjackGameDB.turnIsOver != true) && blackjackGameDB.isStand != true) {
        let cardValue = randomCard();

        showCard(You, cardValue);
        updateScore(You, cardValue);
        showScore(You);
    
        if(You.score > 21) {
            blackjackGameDB.turnIsOver = true;
            const ganador = calcWinner();
            showResult(ganador);
        };    
    };
};

//STAND BUTTON
const standButtonAction = async () => {
    if(blackjackGameDB.turnIsOver != true) {
        blackjackGameDB.isStand = true;

        while (House.score < 16 && blackjackGameDB.isStand == true) {
            let cardNumber = randomCard();
            showCard(House, cardNumber);
            updateScore(House, cardNumber);
            showScore(House);
            await sleep(1000);
        };
    
        blackjackGameDB.turnIsOver = true;
        const victoria = calcWinner();
        showResult(victoria);    
    };
};

//DEAL BUTTON
const dealButtonAction = () => {
    if(blackjackGameDB.turnIsOver == true) {
        let yourImages = document.querySelector(You.div).querySelectorAll('img');
        let houseImgs = document.querySelector(House.div).querySelectorAll('img');

        //Deleting images
        for(let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        };

        if(houseImgs.length > 0) {
            for(let i = 0; i < houseImgs.length; i++) {
                houseImgs[i].remove();
            };
        };

        //Re start scores
        You.score = 0;
        House.score = 0;

        //Setting all to the beginning
        document.querySelector(You.scoreSpan).textContent = 0;
        document.querySelector(House.scoreSpan).textContent = 0;

        document.querySelector(You.scoreSpan).style.color = '#fff';
        document.querySelector(House.scoreSpan).style.color = '#fff';

        //Restart result
        document.getElementById('blackjackGameResults').textContent = "Let's Play";
        document.getElementById('blackjackGameResults').style.color = 'black';

        //Re-start values
        blackjackGameDB.isStand = false;
        blackjackGameDB.turnIsOver = false;
    };
};

//UTILITIES
//Pick random card
function randomCard () {
    const randomNumber = Math.floor(Math.random()*13);
    return blackjackGameDB.cards[randomNumber];
};

//Show card
const showCard = (activedPlayer, card) => {
    if(activedPlayer.score <= 21) {
        const cardImg = document.createElement('img');
        cardImg.src = `../public/img/cards/${card}.png`;

        document.querySelector(activedPlayer.div).appendChild(cardImg);
        hitSound.play();
    }
};

//Update personal score
const updateScore = (player, card) => {
    if (player.score <= 21) {
        if(card === 'A') {
            if(player.score + blackjackGameDB.cardsValues[card][1] <= 21) {
                player.score += blackjackGameDB.cardsValues[card][1];
            } else {
                player.score += blackjackGameDB.cardsValues[card][0];
            }
        } else {
            player.score += blackjackGameDB.cardsValues[card];
        }
    }
};

//Show score
const showScore = (playerActived) => {
    if(playerActived.score > 21) {
        document.querySelector(playerActived.scoreSpan).textContent = 'BUST!';
        document.querySelector(playerActived.scoreSpan).style.color = 'red';
    } else {
        document.querySelector(playerActived.scoreSpan).textContent = playerActived.score;
    }
};

//Sleep function
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

//Compute winner
const calcWinner = () => {
    let winner;

    if(You.score <= 21) {
        if((You.score > House.score) || (House.score > 21)) {
            blackjackGameDB.wins++;
            winner = You;
        };

        if((You.score < House.score) && (House.score <= 21)) {
            blackjackGameDB.losses++;
            winner = House;
        };

        if(You.score == House.score) {
            blackjackGameDB.draws++;
        };
    }

    if(You.score > 21) {
        blackjackGameDB.losses++;
        winner = House;
    }

    return winner;
};

//Show results who´s winner
const showResult = ganador => {
    let messageWinner, messageWinnerColor;

    if(blackjackGameDB.turnIsOver == true) {
        switch (ganador) {
            case (You):
                document.getElementById('blackjackGame__wins').textContent = blackjackGameDB.wins;
                messageWinner = 'You Won!';
                messageWinnerColor = 'blue';
                winSound.play();
                break;
            
            case (House):
                document.getElementById('blackjackGame__losses').textContent = blackjackGameDB.losses;
                messageWinner = 'You Lost!';
                messageWinnerColor = 'red';
                loseSound.play();
                break;
            
            default:
                document.getElementById('blackjackGame__draws').textContent = blackjackGameDB.draws;
                messageWinner = 'You Drew!';
                messageWinnerColor = 'black';
                break;
        };
    };

    document.getElementById('blackjackGameResults').textContent = messageWinner;
    document.getElementById('blackjackGameResults').style.color = messageWinnerColor;
};

//BUTTON EVENTS
document.getElementById('blackjackGame__hitButton').addEventListener('click', hitButtonAction);
document.getElementById('blackjackGame__standButton').addEventListener('click', standButtonAction);
document.getElementById('blackjackGame__dealButton').addEventListener('click', dealButtonAction);