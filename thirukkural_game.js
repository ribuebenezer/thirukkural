document.addEventListener('DOMContentLoaded', function () {
    var kurals = [
        "அகர முதல எழுத்தெல்லாம் ஆதி$பகவன்  முதற்றே உலகு",
        "பிறவிப் பெருங்கடல் நீந்துவர் நீந்தார்$இறைவன் அடிசேரா தார்",
        "துப்பார்க்குத் துப்பாய துப்பாக்கித் துப்பார்க்குத்$துப்பாய தூஉம் மழை",
        "நீர்இன்று அமையாது உலகெனின் யார்யார்க்கும்$வான்இன்று அமையாது ஒழுக்கு",
        "அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை$பண்பும் பயனும் அது",
        "வையத்துள் வாழ்வாங்கு வாழ்பவன் வான்உநற்யும்$தெய்வத்துள் வைக்கப் படும்",
        "ஈன்ற பொழுதின் பெரிதுவக்கும் தன்மகனைச்$சான்றோன் எனக்கேட்ட தாய்",
        "மகன்தந்தைக்கு ஆற்றும் உதவி இவன்தந்தை$என்நோற்றான் கொல் எனும் சொல்",
        "அன்பிற்கும் உண்டோ  அடைக்குந்தாழ் ஆர்வலர்$புன்கணீர் பூசல் தரும்",
        "அன்பிலார் எல்லாம் தமக்குரியர் அன்புடையார்$என்பும் உரியர் பிறர்க்கு",
        "நன்றி மறப்பது நன்றன்று நன்றல்லது$அன்றே மறப்பது நன்று",
        "கொன்றன்ன இன்னா செயினும் அவர்செய்த$ஒன்றுநன்று உள்ளக் கெடும்"
    ];

    var wordChoices = document.getElementById('wordChoices');
    var kuralWords1 = document.getElementById('kuralWords1');
    var kuralWords2 = document.getElementById('kuralWords2');
    var submitBtn = document.getElementById('submitBtn');
    var restartBtn = document.getElementById('restartBtn');
    var result = document.getElementById('result');
    var selectedKural, shuffledKural, selectedWords, wordBlocks;

    function startGame() {
        selectedKural = selectRandomKural(kurals).split('$').join(' ').split(' ');
        shuffledKural = shuffleArray(selectedKural.slice());
        selectedWords = [];
        wordBlocks = {};
        wordChoices.innerHTML = '';
        kuralWords1.textContent = '';
        kuralWords2.textContent = '';
        result.textContent = '';
        restartBtn.style.display = 'none';

        shuffledKural.forEach(function (word) {
            var wordBlock = createWordBlock(word);
            wordChoices.appendChild(wordBlock);
            wordBlocks[word] = wordBlock;
        });
    }

    submitBtn.onclick = function () {
        var score = 0;
        selectedWords.forEach(function (word, index) {
            if (word === selectedKural[index]) score++;
        });
        result.textContent = `Score: ${score}/${selectedKural.length}. Correct Kural: ${selectedKural.join(' ')}`;
        restartBtn.style.display = 'block';
    };

    restartBtn.onclick = startGame;

    function createWordBlock(word) {
        var wordBlock = document.createElement('div');
        wordBlock.className = 'wordBlock';
        wordBlock.textContent = word;
        wordBlock.onclick = function () {
            selectWord(word, wordBlock);
        };
        return wordBlock;
    }

    function selectWord(word, wordBlock) {
        if (!selectedWords.includes(word)) {
            selectedWords.push(word);
            updateKuralDisplay();
            wordBlock.style.display = 'none';
        }
    }

    function updateKuralDisplay() {
        kuralWords1.textContent = '';
        kuralWords2.textContent = '';
        selectedWords.forEach(function(word, index) {
            var wordSpan = document.createElement('span');
            wordSpan.className = 'wordSpan';
            wordSpan.textContent = word;
            wordSpan.onclick = function() {
                deselectWord(word, index);
            };
            if (index < 4) {
                kuralWords1.appendChild(wordSpan);
            } else {
                kuralWords2.appendChild(wordSpan);
            }
        });
    }

    function deselectWord(word, index) {
        selectedWords.splice(index, 1);
        updateKuralDisplay();
        wordBlocks[word].style.display = 'block';
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function selectRandomKural(kurals) {
        var randomIndex = Math.floor(Math.random() * kurals.length);
        return kurals[randomIndex];
    }

    startGame(); // Starts the game initially
});
