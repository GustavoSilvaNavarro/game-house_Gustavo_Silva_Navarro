//MEMORY GAME
//Database of my cards
const memoryGame = [
    {
        name: 'fries',
        img: '../public/img/images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: '../public/img/images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: '../public/img/images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: '../public/img/images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: '../public/img/images/milkshake.png'
    },
    {
        name: 'pizza',
        img: '../public/img/images/pizza.png'
    },
    {
        name: 'fries',
        img: '../public/img/images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: '../public/img/images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: '../public/img/images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: '../public/img/images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: '../public/img/images/milkshake.png'
    },
    {
        name: 'pizza',
        img: '../public/img/images/pizza.png'
    }
];

document.getElementById('cleanButton').addEventListener('click', restartGame);

//Shuffle the array
memoryGame.sort(() => 0.5 - Math.random());

let cardsChosen = [];
let cardsChosenId = [];
let winnerCards = [];

const gridDisplay = document.querySelector('#memoryGameGrid');
const scoreResults = document.querySelector('#memoryGameResult');

function createBoardGame () {
    for(let i = 0; i < memoryGame.length; i++) {
        const cards = document.createElement('img');
        cards.setAttribute('src', '../public/img/images/blank.png');
        cards.setAttribute('data-id', i);
        cards.addEventListener('click', flipCard);
        gridDisplay.append(cards);
    };
};

createBoardGame();

function flipCard () {
    if(cardsChosen.length <= 1) {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(memoryGame[cardId].name);
        cardsChosenId.push(cardId);

        this.setAttribute('src', memoryGame[cardId].img);
        if (cardsChosen.length == 2) {
            setTimeout(checkMatch, 500);
        };
    };
};

function checkMatch () {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    console.log(cards);
    if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', '../public/img/images/blank.png');
        cards[optionTwoId].setAttribute('src', '../public/img/images/blank.png');

        alert('No puedes dar click dos veces en la misma carta');
    } else {

        if(cardsChosen[0] === cardsChosen[1]) {
            alert('Lo hiciste Perro');
            cards[optionOneId].setAttribute('src', '../public/img/images/white.png');
            cards[optionTwoId].setAttribute('src', '../public/img/images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            winnerCards.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', '../public/img/images/blank.png');
            cards[optionTwoId].setAttribute('src', '../public/img/images/blank.png');
        };

        scoreResults.textContent = winnerCards.length;

        if(winnerCards.length == (memoryGame.length / 2)) {
            scoreResults.textContent = 'Congratulations!';
        };
    };

    //re start the code
    cardsChosen = [];
    cardsChosenId = [];
};

function restartGame() {
    cardsChosen = [];
    cardsChosenId = [];
    winnerCards = [];

    console.log('Perro');
};