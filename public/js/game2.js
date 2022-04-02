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

    if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', '../public/img/images/blank.png');
        cards[optionTwoId].setAttribute('src', '../public/img/images/blank.png');

        //toasts
        notificationGame('start-0', 'bg-danger');
        const toastLiveExample = document.getElementById('liveToast');
        document.querySelector('#memoryGameText').textContent = "You can't click twice same card";

        if (toastLiveExample) {
            var toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        };
    } else {
        if(cardsChosen[0] === cardsChosen[1]) {
            //toasts
            notificationGame('end-0', 'bg-success');
            const toastLiveExample = document.getElementById('liveToast');
            document.querySelector('#memoryGameText').textContent = 'Good job, keep playing!';

            if (toastLiveExample) {
                var toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
            };

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
    scoreResults.textContent = 0;

    let allCards = document.querySelector('#memoryGameGrid').querySelectorAll('img');

    for(let i = 0; i < allCards.length; i++) {
        allCards[i].remove()
    };

    memoryGame.sort(() => 0.5 - Math.random());

    createBoardGame();
};

//Notification
const notificationGame = (position, color) => {
    const notificacion = `
    <div class="position-fixed bottom-0 ${position} p-3" style="z-index: 11">
        <div id="liveToast" class="toast text-white ${color} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body" id="memoryGameText"></div>
        </div>
    </div>`;

    const span = document.querySelector('#toastBlock');
    span.innerHTML = notificacion;
};