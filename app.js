const textBox = document.querySelector('.text-box');
const attackBox = document.querySelector('.attack-box');
const newGameBox = document.querySelector('.new-game-box');
const rock_p = document.getElementById('rock');
const paper_p = document.getElementById('paper');
const scissors_p = document.getElementById('scissors');
const text = document.querySelector('.text');
const newGame_button = document.getElementById('new-game');
const rivalHP_span = document.getElementById('rival-HP');
const playerHP_span = document.getElementById('player-HP');
const rivalHPContent = document.getElementById('rival-HP-content');
const playerHPContent = document.getElementById('player-HP-content');



// Initial state
textBox.style.display = 'flex';
attackBox.style.display = 'none';
newGameBox.style.display = 'none';
text.textContent = 'RIVAL wants to fight!'
let textOrder = 1;
let userAttack = '';
let compAttack = '';
let win = false;
let draw = true;
let playerHP = 5;
let rivalHP = 5;


textBox.addEventListener('click', () => {

    switch(textOrder){
        case 1:
            textBox.style.display = 'none';
            attackBox.style.display = 'flex';
            playerAttack();
            break;
        case 2:
            playerHit();
            break;
        case 3:
            playerMissed();
            break;
        case 4:
            rivalAttack();
            break;
        case 5:
            rivalHit();
            break;
        case 6:
            rivalMissed();
            break;
        case 7:
            playerWins();
            break;
        case 8:
            rivalWins();
            break;
        case 9:
            winQuote();
            break;
        case 10:
            loseQuote();
            break;
        case 11:
            playAgain();
            break;
    }

});

rock_p.addEventListener('click', () => {
    console.log('PLAYER used ROCK!');
    textBox.style.display = 'flex'; //Toggle to text box
    attackBox.style.display = 'none';
    userAttack = 'ROCK';
    playerAttack();
});

paper_p.addEventListener('click', () => {
    console.log('PLAYER used PAPER!');
    textBox.style.display = 'flex'; //Toggle to text box
    attackBox.style.display = 'none';
    userAttack = 'PAPER';
    playerAttack();
});

scissors_p.addEventListener('click', () => {
    console.log('PLAYER used SCISSORS!');
    textBox.style.display = 'flex'; //Toggle to text box
    attackBox.style.display = 'none';
    userAttack = 'SCISSORS';
    playerAttack();
});

newGame_button.addEventListener('click', () => {
    newGame();
});

//------------------------------ HOVER EVENT LISTENERS-----------------------------

rock_p.addEventListener('mouseover', function() {
    rock_p.innerHTML = '&#9658ROCK';
});

rock_p.addEventListener('mouseout', function() {
    rock_p.innerHTML = '&#160&#160&#160ROCK';
});

paper_p.addEventListener('mouseover', function() {
    paper_p.innerHTML = '&#9658PAPER';
});

paper_p.addEventListener('mouseout', function() {
    paper_p.innerHTML = '&#160&#160&#160PAPER';
});

scissors_p.addEventListener('mouseover', function() {
    scissors_p.innerHTML = '&#9658SCISSORS';
});

scissors_p.addEventListener('mouseout', function() {
    scissors_p.innerHTML = '&#160&#160&#160SCISSORS';
});


// ----------------------------------TEXTBOX OUTPUTS--------------------------------

// CASE 1
function playerAttack() {
    text.textContent = `PLAYER used ${userAttack}!`;

    // Determine who wins here
    rivalPlay();
    battleTurn(userAttack);
    // End of battle calculation
    
    if ( win === true ) {
        textOrder = 2;
    }else{
        textOrder = 3;
    }
}

// CASE 2
function playerHit() {

    text.textContent = 'It\'s super effective!';
    textOrder = 4;
    rivalHP--;
    rivalHP_span.textContent = rivalHP;
    rivalHPContent.style.flexBasis = `${(rivalHP*60)}px`;
    console.log(`RIVAL HP: ${rivalHP}`);

    if(rivalHP === 0){
        textOrder = 7;
    }
}

// CASE 3
function playerMissed() {
    text.textContent = 'PLAYER missed!'

    textOrder = 4;
}

// CASE 4
function rivalAttack() {
    text.textContent = `RIVAL used ${compAttack}!`;
    console.log(`RIVAL used ${compAttack}!`);

    if ( win === true ){
        textOrder = 6;
    }else if(draw === true){
        textOrder = 6;
    }else{
        textOrder = 5;
    }        
    
}

// CASE 5
function rivalHit() {
    text.textContent = `It\'s super effective!`;
    textOrder = 1;
    playerHP--;
    playerHP_span.textContent = playerHP;
    playerHPContent.style.flexBasis = `${(playerHP*60)}px`;
    console.log(`PLAYER HP: ${playerHP}`);

    if(playerHP === 0){
        textOrder = 8;
    }
}

// CASE 6
function rivalMissed() {
    text.textContent = 'RIVAL missed!'
    textOrder = 1;
}

//CASE 7
function playerWins() {
    text.textContent = 'PLAYER wins!'
    textOrder = 9;
}

//CASE 8
function rivalWins() {
    text.textContent = 'RIVAL wins!';
    textOrder = 10;
}

//CASE 9
function winQuote() {

    let randomQuote = Math.floor(Math.random() * 3);
    switch(randomQuote){
        case 0:
            text.textContent = 'WHAT? Unbelievable! I picked the wrong hand!';
            break;
        case 1:
            text.textContent = 'Awww! You just lucked out!';
            break;
        case 2:
            text.textContent = 'Hey! Take it easy! You won already!';
            break;
    }

    textOrder = 11;
}

//CASE 10
function loseQuote() {

    text.textContent = 'Yeah! Am I great or what?';
    textOrder = 11;
}

//CASE 11
function playAgain() {
    
    textBox.style.display = 'none';
    attackBox.style.display = 'none';
    newGameBox.style.display = 'flex';
}


//----------------------------------BATTLE CALCULATIONS------------------------------

function rivalPlay() {

    let randomNumber = Math.floor(Math.random() * 3);

    switch (randomNumber){
        case 0:
            compAttack = 'ROCK';
            break;
        case 1:
            compAttack = 'PAPER';
            break;
        case 2:
            compAttack = 'SCISSORS';
            break;
    }
    return compAttack; 
}

function battleTurn(userAttack){

    switch (userAttack + compAttack){
        case 'ROCKSCISSORS':
        case 'PAPERROCK':
        case 'SCISSORSPAPER':
            win = true;
            draw = false;
            break;
        case 'ROCKPAPER':
        case 'PAPERSCISSORS':
        case 'SCISSORSROCK':
            win = false;
            draw = false;
            break;
        case 'ROCKROCK':
        case 'PAPERPAPER':
        case 'SCISSORSSCISSORS':
            draw = true;
            win = false;
            break;
    }
}

//------------------------------- NEW GAME ------------------------------------------

function newGame(){

    textOrder = 1;
    userAttack = '';
    compAttack = '';
    win = false;
    draw = true;
    playerHP = 5;
    rivalHP = 5;

    playerHP_span.textContent = playerHP;
    playerHPContent.style.flexBasis = `${(playerHP*60)}px`;
    rivalHP_span.textContent = rivalHP;
    rivalHPContent.style.flexBasis = `${(rivalHP*60)}px`;

    console.log(rivalHP)
    attackBox.style.display = 'none';
    newGameBox.style.display = 'none';
    textBox.style.display = 'flex';
    text.textContent = 'Rival wants to fight!'

}
