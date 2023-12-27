import express from "express";
import { WebSocketServer } from "ws";
import {generateStartScreen} from "./startScreen";
import {FACTS} from "./facts";
import {handleCORS} from "./handleCORS";


const USED_PORT = 10000

const app = express();
app.use(express.json())
app.use(handleCORS)

const wsSeverFacts = new WebSocketServer({
    noServer: true,
    clientTracking: true
})
const wsSeverNames = new WebSocketServer({
    noServer: true,
    clientTracking: true
})

wsSeverFacts.on('connection', (socket, _) => {
    socket.on('error', console.error)
})
wsSeverNames.on('connection', (socket, _) => {
    socket.on('error', console.error)
})

/**
 * This endpoint returns one of the facts in {@see facts.ts}. The id is the index in the array.
 */
app.get("/fact/:id", async (request, response) => {
    const id_string = request.params['id']
    let id = 0
    try {
        id = parseInt(id_string)
    } catch (e) {
        response.status(400)
        response.send(`The id must be a number. However, you passed '${id_string}' as id for this request.`)
        return
    }

    if (id < 0 || id >= FACTS.length) {
        response.status(400)
        response.send(`The id must be between 0 and ${FACTS.length - 1} (inclusive). However, you passed the id '${id}'.`)
        return
    }
    response.status(200)
    let fact = FACTS[id]
    // send the result to every connected websocket listener
    wsSeverFacts.clients.forEach(wsClient => {
        wsClient.send(JSON.stringify({
            id: id,
            fact: fact
        }))
    })
    response.send(fact)
})

/**
 * This endpoint allows the posting of a name in the body.
 * The body should be a json object with the key 'name' that contains the name as string.
 */
app.post("/name", async (request, response) => {
    const name = request.body.name

    // send the name to every connected websocket client
    wsSeverNames.clients.forEach(wsClient => {
        wsClient.send(name)
    })

    response.status(204)
    response.send(null)
})

const server = app.listen(USED_PORT, () => {
    // just for the console output after the server started
    console.log(generateStartScreen(USED_PORT))
})

// ==================================================================================
// ======================= Handle Websocket Connections =============================
// ==================================================================================
server.on('upgrade', (request, socket, head) => {
    const pathname = request.url;
    // we want to separate the websocket connections by connected endpoint
    if (pathname === '/name') {
        wsSeverNames.handleUpgrade(request, socket, head, socket => {
            wsSeverNames.emit('connection', socket, request)
        })
    }
    if (pathname === '/fact') {
        wsSeverFacts.handleUpgrade(request, socket, head, socket => {
            wsSeverFacts.emit('connection', socket, request)
        })
    }
})

export default {}