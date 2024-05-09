// Imports use relative file paths or Node.js package names
import { textInput } from './dom-utils';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import './styles/style.css';


//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE

const words = ['FLOWER', 'FIRE', 'APPLE', 'PAINTING', 'STUDY', 'PROGRAMMING', 'WRITE'];
let currentWord: string = '';
let guessedLetters: Set<string> = new Set();
let remainingAttempts: number = 10;

function chooseWord(): void {
    currentWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord(): string {
    return currentWord.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
}

function displayAttempts(): string {
    return `Guess the Word!`;
}

function checkGuess(letter: string): void {
    if (!guessedLetters.has(letter) && !currentWord.includes(letter)) {
        remainingAttempts--;
    }
    guessedLetters.add(letter);
    if (isGameWon()) {
        alert('Congratulations! You won!');
        resetGame();
    } else if (isGameOver()) {
        alert(`Game over! The word was "${currentWord}".`);
        resetGame();
    }
    render();
}

function isGameWon(): boolean {
    return currentWord.split('').every(letter => guessedLetters.has(letter));
}

function isGameOver(): boolean {
    return remainingAttempts <= 0;
}

function resetGame(): void {
    chooseWord();
    guessedLetters.clear();
    remainingAttempts = 10;
}

function render(): void {
    const wordDisplay = document.getElementById('word-display');
    const attemptsDisplay = document.getElementById('attempts-display');

    if (wordDisplay && attemptsDisplay) {
        wordDisplay.textContent = displayWord();
        attemptsDisplay.textContent = displayAttempts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    chooseWord();
    render();

    const keyboard = document.getElementById('keyboard');
    if (keyboard) {
        keyboard.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement && event.target.dataset.letter) {
                const letter = event.target.dataset.letter;
                checkGuess(letter);
            }
        });
    }
});
