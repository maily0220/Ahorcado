const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
const titulo = document.getElementById('titulo');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const cuerpo = {

    //CABEZA
    cabeza: [
        [19,6,8,2],
        [17,8,2,8],
        [19,16,8,2],
        [27,8,2,8]
    ],
    
    //TORSO
    torso: [
        [22,17,2,15] 
    ],
    
    //BRAZO IZQUIERDO
    brazoIzquierdo: [
        [20,20,2,2],
        [18,22,2,7]
    ],
    
    //BRAZO DERECHO
    brazoDerecho: [
        [24,20,2,2],
        [26,22,2,7]
    ],
    
    //PIERNA IZQUIERDA
    piernaIzquierda: [
        [20,32,2,8],
        [18,38,4,2]
    ],
    
    //PIERNA DERECHA
    piernaDerecha: [
        [24,32,2,8],
        [24,38,4,2]
    ]
};

const bodyParts = Object.values(cuerpo)

let selectedWord;
let usedLetters;
let mistakes;
let hits;

function addLetter(letter){
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

function endGame(){
    document.removeEventListener('keydown', letterEvent);
    startButton.innerText = 'REINICIAR';
    startButton.classList.add('reiniciar');
    startButton.classList.remove('start')
    startButton.style.display = 'block';
}

function addBodyPart(bodyPart){
    ctx.fillStyle = '#263573';
    bodyPart.forEach(segment =>{
        ctx.fillRect(...segment)
    })
};

function wrongLetter(){
   addBodyPart(bodyParts[mistakes]);
   mistakes++
   if(mistakes === bodyParts.length) endGame();
}

function correctLetter(letter){
    const { children } = wordContainer;
    for(let i = 0; i < children.length; i++){
        if(children[i].innerHTML === letter){
            children[i].classList.toggle('hidden');
            hits++
        }
    }

    if(hits === selectedWord.length) endGame();
}

function letterInput(letter){
    if(selectedWord.includes(letter)){
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
}

function letterEvent(event){
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)){
        letterInput(newLetter);
    }
}

function drawWord(){
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
}

function selectRandomWord(){
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
}

function drawHangMan(){
    ctx.canvas.width = 200;
    ctx.canvas.height = 250;
    ctx.scale(5, 5);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#805446';
    ctx.fillRect(0, 46, 18, 2);
    ctx.fillRect(2, 0, 2, 48);
    ctx.fillRect(2, 0, 20, 2);
    ctx.fillRect(22, 2, 2, 4);
}

function startGame() {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    if(startButton.innerText !== 'Start!'){
        startButton.innerText = 'Start!';
        startButton.classList.remove('reiniciar');
        startButton.classList.add('start')
        titulo.classList.add("h1-restart");
    }
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent)
};

startButton.addEventListener('click', startGame);