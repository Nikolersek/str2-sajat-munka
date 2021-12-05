let cards = [
    'a',
    'a',
    'b',
    'b',
    'c',
    'c',
    'd',
    'd',
    'e',
    'e',
    'f',
    'f',
    'g',
    'g',
    'h',
    'h',
    'i',
    'i',
    'j',
    'j'
];

let clickCounter = 0;
let isDisableClicking = false;
let timer;
let time = 0;

const init = () => {
    time = 0;
    clickCounter = 0;
    isDisableClicking = false;
    generateRandomCardPositions();
    drawCard();
    drawSeconds();
    listenClickEvent();
};

const generateRandomCardPositions = () => {
    shuffle(cards);
}

const drawCard = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    for(var i in cards) {
        wrapper.innerHTML+= '<div class="card" data-index="'+i+'">' +
            '<div class="card-inner">' +
                '<div class="card-front"></div>' +
                '<div class="card-back">'+cards[i]+'</div>' +
            '</div>' +
        '</div>';
    }
}

const listenClickEvent = () => {
    const cardDivs = document.querySelectorAll('.card');
    for (let i = 0; i < cardDivs.length; i++) {
        cardDivs[i].addEventListener('click', e => {
            if(!isDisableClicking) {
                if(
                    !e.target.parentNode.parentNode.classList.contains('flipped') &&
                    !e.target.parentNode.parentNode.classList.contains('matched')
                ) {
                    if(!timer) {
                        startTimer();
                    }
                    clickCounter++;
                    e.target.parentNode.parentNode.classList.add('flipped');
                    if(clickCounter == 2) {
                        isDisableClicking = true;
                        if(!checkedMatch()) {
                            window.setTimeout(removeFlippedCards, 1000)
                        }
                        else {
                            if(gameIsEnded()) {
                                window.clearInterval(timer);
                                window.setTimeout(init, 5000)
                            }
                            else {
                                clickCounter = 0;
                                isDisableClicking = false;
                            }

                        }
                    }
                }

            }
        });
    }
};

const startTimer = () => {
    timer = window.setInterval(() => {
        time++;
        drawSeconds();
    }, 1000)
};

const drawSeconds = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    document.querySelector('.timer').innerHTML = `${minutes}:${seconds}`;
};

const checkedMatch = () => {
    const flippedCards = document.querySelectorAll('.card.flipped');
    let flippedFirstCardValue = cards[flippedCards[0].dataset.index];
    let flippedSecondCardValue = cards[flippedCards[1].dataset.index];
    if(flippedFirstCardValue === flippedSecondCardValue ) {
        flippedCards[0].classList.replace('flipped','matched');
        flippedCards[1].classList.replace('flipped','matched');
        return true
    }
    return false;
};

const removeFlippedCards = () => {
    clickCounter = 0;
    const flippedCards = document.querySelectorAll('.card.flipped');
    for (let i = 0; i < flippedCards.length; i++) {
        flippedCards[i].classList.remove('flipped');
    }
    isDisableClicking = false;
};

const gameIsEnded = () => {
    const flippedCards = document.querySelectorAll('.card.matched');
    return flippedCards.length === 20;
};

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


init();