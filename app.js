import {DataService} from './modules/data.js'
import {Game} from './modules/game.js'
import {UI} from './modules/ui.js'


let data = new DataService("/api")
const ui = new UI(
    document.getElementById("loader"),
    document.getElementById("photo-container"),
    document.getElementById("photo-wrapper"),
    document.getElementById("game-over"),
    document.getElementById("api-limit"),
    document.getElementById("score"),
    document.getElementById("score-change"),
    null,
    document.getElementById("title"),
    document.querySelectorAll('.vote'),
    document.getElementById("reveal-original"),
    document.getElementById("repeat"),
)

const game = new Game(data, ui)

setTimeout(() => {
    game.render()
}, 1000);
