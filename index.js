const chalk = require('chalk');
const readline = require('readline')
const CELL_EMPTY = " "
const CELL_PLAYER1 = chalk.blueBright("x")
const CELL_PLAYER2 = chalk.redBright("O")
const player_turn = 0

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  }) 

const board = [
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
]

function welcomeMessage(msg) {
    write(String("Welcome to connect 4 !" + "\n"))
}

welcomeMessage()


function display(board){
    board.forEach(row => {

        row.forEach(cell => {
        write(String(chalk.whiteBright('[ ')))
    write(String(cell))
    write(String(chalk.whiteBright(' ]')))
})

    write(String('\n'))
})
}



// Récup de la cellule. console.log(board[6][0])

playGame()

function playGame() {
    const state = {
        board: board,
        turn: 0

    }
}



  function playNextMove(state) {
    promptNextMove(state)
    // isQuit
    // move = parseMove(cmd)
    // validation = validateMove(move)
    // if (validation.isValid) {
    //   applyMove(state, validation.move)
    // } else {
    //   display()
    //   promptNextMove(state)
    // }
  }
    const tabHorizontal =[
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_PLAYER2, CELL_PLAYER2, CELL_PLAYER2, CELL_PLAYER2, CELL_EMPTY, CELL_EMPTY],
        [CELL_PLAYER1, CELL_PLAYER1, CELL_PLAYER1, CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY]
    ]
    const tabVertical = [
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_PLAYER1, CELL_PLAYER2, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_PLAYER1, CELL_PLAYER2, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_PLAYER1, CELL_PLAYER2, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_PLAYER1, CELL_PLAYER2, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    ]

  function checkWin() {
    flag = true
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[i][j] != tabHorizontal[i][j]) {
                flag = false
        }
    }
    return flag
  }

  function promptNextMove(state) {
    const player = getPlayerForState(state)
    const displayPlayer = getDisplayPlayer(player)
    display(state.board)
    const  question = `${displayPlayer}, prochain coup ? `
    prompt(question, answer => {
      let i = 6
      while (board[i][answer - 1] !== " ") {
        i--
      }
      if(board[i][answer - 1] !== " ") {
        board[i][answer -1] = player
        //console.log('\033[2j')
        if(checkWin()){
            console.log("caca")
        }
        state.turn++
        promptNextMove(state)

      } else {
        board[i][answer -1] = player
        //console.log('\033[2J')
        if(checkWin()){
            console.log("caca")
        }
        state.turn++
        promptNextMove(state)
      }
    })
  }
  function getPlayerForState(state) {
    const turn = state.turn
    if (turn % 2 === 0) {
      return CELL_PLAYER1
    } else {
      return CELL_PLAYER2
    }
  }

  function getDisplayPlayer(player) {
    switch (player) {
      case CELL_PLAYER1: return 'Joueur A'
      case CELL_PLAYER2: return 'Joueur B'
      default: throw new Error('Invalid player: ' + player)
    }
  }
}

function prompt(question, callback) {
  rl.question(question, callback)
}

function write(msg) {
  process.stdout.write(msg)
}

/*
let i = 5
        while (state.board[i][answer-1] != 0) {
            i--
        }
        state.board[i][answer-1] = player
*/

 /*
        try {
            board[i][answer -1] = player
        } catch(err) {
            if (err instanceof TypeError) {

            } else {
                throw
            }
        }
*/

/*
//// Possibilités de gagner :
//Horizontal
const board = [
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_PLAYER1, CELL_PLAYER1, CELL_PLAYER1, CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY],
]

//Vertical
const board = [
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
]

//Oblique
const board = [
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_EMPTY, CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_EMPTY, CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    [CELL_PLAYER1, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
]
*/