const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const {
    listAllGames,
    findGame,
    createGame
} = require('./data')


const app = express()
const router = express.Router()

const publicRoot = 'public'
app.use(express.static(publicRoot))

//L'ordre est très important
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded())
app.use(router)

app.use((req, res, next) => { //next est le middleware. Si le next() dedans est caché, la page ne chargera pas
    next()
})

//Permet de pouvoir appeler les fichiers dans le dossier public
app.use('/static', express.static('public'))

const myCompression = compression()
app.use(myCompression)

//POST
router.post('/game', (req, res) => {

    createGame({
        player1: req.body.player1,
        player2: req.body.player2
    })
        .then( result => {
            res.redirect(303, '/games/'+result._id)
        })
})


router.post('/ping', (req, res) => {
    const value = req.body ? req.body.value : null
    console.log({
        response: value
    })
    res.send({
        response: value
    })
})


//GET
router.get('/game/:id/  json', (req, res) => {
    const id = req.params.id
    findGame(id)
        .then(game => {
            if (game === null) {
                res.status(404).send({error: 'not found'})
            } else {
                res.send(game)
            }
        })
        .catch(err => {
            console.error('Failed to serve /game/....json', err.stack)
            res.status(500).send({error: 'server error'})
        })
})

router.get('/', (req, res) => {
        listAllGames()
        .then(games => {
            const html = renderGames(games)
            res.send(html)
        })
        .catch(err => {
            console.error('Failed to serve /', err.stack)
            res.status(500).send('Oops !')
        })
    return

})


function getBoard(game) {
    return game.history[game.history.length-1].board
}


function displayBoard(board) {

    console.log(board)
    var tra = "<table id='board'>"
    var i = 1
    var j = 1
        board.forEach(row => {
            tra += "<tr id='row'" + i + "'>"
            i++
            j = 1
            row.forEach(cell => {
                if(cell == 1) {
                    tra += "<td id='row"+i+"_col"+j+"style=background-color:blue;'></td>"
                } else if(cell == 2) {
                    tra += "<td id='row"+i+"_col"+j+"style=background-color:red;'></td>"
                } else {
                    tra += "<td id='row"+i+"_col"+j+"'></td>"
                }
                j++
            })
            tra += "</tr>"
        })
    tra += "</table>"
    return tra
}


router.get('/games/:id', (req, res) => {
    const id = req.params.id
    findGame(id)
        .then(game => {
            const board = getBoard(game)
            const table = displayBoard(board)
            if (game === null) {
                res.status(404).send('Partie inexistante')
            } else {
                res.send(`
                <html>
                    <head>
                        <title>Jeu ${game._id}</title>
                        <link rel ="stylesheet" href="/static/style.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css"/>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.js"></script>
                    </head>
                    <body>
                        <a href="/">Back</a>
                        <h1>THE GAME</h1>
                        <div>
                            <table class="ui fixed single line celled table">
                                <thead>
                                <tr><th>ID Game</th>
                                <th>Players name</th>
                                <th>Number of turns</th>
                                </tr></thead>
                            <tbody>
                                <tr>
                                    <td>${game._id}</td>
                                    <td>${game.player1}</td>
                                    <td>${game.turn}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>${game.player2}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            </table>
                            <section>
                                ${table}
                            </section>
                        </div>
                    <script type="text/javascript" src="/static/script.js"></script>
                    </body>
                </html>
        `)

            }
        })
})


function renderGames(games) {
    const list = games.map(game => { //sorte de foreach !
        return `<li><a href="/games/${game._id}">${game._id}</a></li>`
    })
        .join(' ')
            return ` <html>
                     <head>
                         <title>Connect 4</title>
                         <link rel ="stylesheet" href="/static/style.css">
                         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css"/>
                         <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                         <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.js"></script>
                     </head>
                     <body>
                         <h1>Welcome to my connect 4 !</h1>
                         <form style="text-align:center" action="/game" method="POST">
                             <label for="player1">Player 1 : </label>
                             <input type="text" name="player1" placeholder="Player 1 name...">
                             <br>
                             <br>
                             <label for="player2">Player 2 : </label>
                             <input type="text" name="player2" placeholder="Player 2 name...">
                             <br>
                             <br>
                             <input type="submit" value="New game">
                         </form>
                         <div>
                            <table class="ui celled table">
                                <thead>
                                <tr><th style="text-align: center">Games list</th>
                                </tr></thead>
                                <tbody>
                                <tr>
                                <td>
                                <div class="gamesScrollBar">
                                    ${list}
                                </div>
                                </td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr><th colspan="3">
                                </th>
                                </tr></tfoot>
                            </table>
                         </div>
                     </body>
                </html>
                
            `
}

//A mettre dans un autre fichier

app.listen(80, (err) => {
    if(err) {
        console.error(err ? err.stack : err)
        process.exit(255)
    } else {
        console.log('Listening on *:80')
    }
})