// Function to load the JSON data asynchronously
function loadKurals() {
    return fetch('thirukural.json')
        .then(response => response.json())
        .then(data => data);
}

// Function to get a random Kural
function getRandomKural(kurals) {
    const randomIndex = Math.floor(Math.random() * kurals.length);
    return kurals[randomIndex];
}

// Function to set up the game with a Kural
function setupGame(kural) {
    displayKuralDetails(kural);
    let words = kural.kural.join(' ').split(' ');
    let shuffledWords = shuffleArray(words.slice());

    let wordChoices = document.getElementById('wordChoices');
    wordChoices.innerHTML = '';
    shuffledWords.forEach(function (word) {
        let wordBlock = document.createElement('div');
        wordBlock.className = 'wordBlock';
        wordBlock.textContent = word;
        wordBlock.onclick = function () {
            selectWord(word, wordBlock);
        };
        wordChoices.appendChild(wordBlock);
    });
}

// Function to display the details of a Kural
function displayKuralDetails(kural) {
    let kuralDetailsDiv = document.getElementById('kuralDetails');
    kuralDetailsDiv.innerHTML = `
        <h3>${kural.chapter}</h3>
        <p>${kural.kural.join('<br>')}</p>
        <p>Meaning: ${kural.meaning.en}</p>
    `;
}

// Function to shuffle an array (utility function for the game)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to handle word selection (placeholder for your implementation)
function selectWord(word, wordBlock) {
    // Implementation for selecting words...
}

// Event listener for DOMContentLoaded to start the game
document.addEventListener('DOMContentLoaded', function () {
    loadKurals().then(kurals => {
        let selectedKural = getRandomKural(kurals);
        setupGame(selectedKural);
    });

    document.getElementById('submitBtn').onclick = function () {
        // Implementation for submit button...
    };
});
