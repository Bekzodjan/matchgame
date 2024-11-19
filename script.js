// script.js
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let shuffledCards = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
let flippedCards = [];
let matchedCards = 0;

// Function to create and display cards
function createCards() {
    const cardGrid = document.querySelector('.card-grid');
    shuffledCards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        cardGrid.appendChild(card);
    });
}

// Function to flip the card
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }
    
    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Function to check if the flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === shuffledCards.length) {
            alert('Congratulations! You won!');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

// Initialize the game
createCards();
