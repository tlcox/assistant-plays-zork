# Assistant Plays Zork
This is a Google assistant action that allows the user to play Zork I (https://en.wikipedia.org/wiki/Zork_I). The Zork series is in the public domain.

## Architecture
The Application is split into 3 main parts:

### Zork
The Zork source from https://github.com/devshane/zork is used to run the game of zork. The source files are included in the project under ther "zork" folder. The start script builds the binaries when it is started.

### REST API
The interface to Zork is handled by a REST API built with Node.js and Express.js. When requested (with a GET request to /startGame endpoint) the Zork binary is started as a child_process and communication can be sent and received on the child's stdin and stdout respectively.

Endpoints:
* GET - /startGame: ends any running games and starts a new game, responds with any data on stdout.
* POST - /: string in request.body.cmd is sent to the stdin of running game as the next instruction, response is returned.
* GET - /: returns the last message that was sent on the running game's stdout
* GET - /end: ends the running game and responds with success message.

### Actions on Google
Actions on Google is used to feed the commands from Google assistant to the REST API and playback the responses. Intentions are created to start the game (manually and on action start), end the game when the action is cancelled, send commands, and repeat prompts. Each intention is handled using a webhook fullfillment running as a Firebase function. The fullfillment has handlers for each intention.

## Running
The backend application can be run with the following:
```
cd node-app
npm start
```
The start script builds the Zork binary w/ make. Their may be error messages if dependencies are not met.
