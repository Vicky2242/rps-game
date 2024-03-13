let score = JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    Losses:0,
    Ties:0
};

console.log(localStorage.getItem('score'));

if(!score){
    score={
        wins:0,
        losses:0,
        ties:0
    };

   updateScoreElement();
}

let isAutoPlaying = false;
let intervalId;

function autoplay(){
    if(!isAutoPlaying){
        intervalId=setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
   
}

document.querySelector('.js-rock-button').addEventListener('click', () =>{
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () =>{
    playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () =>{
    playGame('Scissors');
});

document.body.addEventListener('keydown', ( event)=>{
    if(event.key === 'R'){
        playGame('Rock');
    } else if (event.key === 'P'){
        playGame('Paper');
    }else if(event.key === 'S'){
        playGame('Scissors');
    }
});



function playGame(playerMove){
const computerMove=pickComputerMove();

let result='';


    if(playerMove==='Scissors'){
    if(computerMove ==='Rock'){
        result='You Lose.';
    } else if(computerMove === 'Paper'){
        result='You Win.';
    } else if(computerMove === 'Scissors'){
        result = 'Tie.';
    }

    } else if(playerMove === 'Paper'){
    if(computerMove ==='Rock'){
    result='You Win.';
    } else if(computerMove === 'Paper'){
        result='Tie.';
    } else if(computerMove === 'Scissors'){
        result = 'You Lose.';
    }

    }else if(playerMove === 'Rock'){
        if(computerMove ==='Rock'){
        result='Tie.';
    } else if(computerMove === 'Paper'){
        result='You Lose.';
    } else if(computerMove === 'Scissors'){
        result = 'You Win.';
    }
    }

    if(result === 'You Win.'){
        score.wins +=1;
    } else if(result === 'You Lose.'){
        score.Losses +=1;
    } else if(result === 'Tie.'){
        score.Ties +=1;
    }

    localStorage.setItem('score', JSON.stringify(score));


    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = ` You
<img src="${playerMove}-emoji.png"  class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, 
    Losses: ${score.Losses}, Ties: ${score.Ties}`
}



function pickComputerMove(){
const randomNumber=Math.random();

let computerMove='';


if(randomNumber >=0 && randomNumber < 1/3){
computerMove='Rock';
} else if(randomNumber >=1/3 && randomNumber < 2/3){
computerMove='Paper';
}else if (randomNumber >=2/3 && randomNumber < 1){
computerMove='Scissors';
}

return computerMove;
}