//define variables and create array containing arrays. 

const playerX = 'x'
const playerO = 'circle'
const combinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
]


// define variables for each cell on the board, and button. 

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()  //call startgame

restartButton.addEventListener('click', startGame,)


// add functions 

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(playerX)
        cell.classList.remove(playerO)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true} )
        
    })

    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? playerO : playerX
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
      swapTurns()
      setBoardHoverClass()
    }
    
  }


  // create remaining functions

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Tie'
      tie();
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "o" : "x"} wins`
      taDa();
    }
    winningMessageElement.classList.add('show')
  }
  
  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
  }
  
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
  }
  
  function swapTurns() {
    circleTurn = !circleTurn
  }
  
  function setBoardHoverClass() {
    board.classList.remove(playerX)
    board.classList.remove(playerO)
    if (circleTurn) {
      board.classList.add(playerO)
       oPlay(); 
    } else {
      board.classList.add(playerX)
      xPlay();
    }
  }
  
  

  function checkWin(currentClass) {
    return combinations.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }

  // add audio functions
    function oPlay() {
        const audio = new Audio("audio/beep-short.mp3");
        audio.play();
    }

    function xPlay() {
        const audio = new Audio ("audio/clockbeep.mp3");
        audio.play();
    }

    function taDa() {
        const audio = new Audio ("audio/tada.mp3");
        audio.play();
    }

    function tie() {
        const audio = new Audio ("audio/tie.wav");
        audio.play();
    }