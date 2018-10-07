# Assistant Plays Zork
This is a Google assistant action that allows the user to play Zork I (https://en.wikipedia.org/wiki/Zork_I). The Zork series is in the public domain.

## Architecture
The Application is split into 3 main parts: Zork binary, REST API interface, and Actions on Google.

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
Actions on Google is used to feed the commands from Google assistant to the REST API and playback the responses. Our google action is setup with the name "lord zork", so the action can be trigured using the phrase: "Hey Google, talk to lord zork".

Intents are created to start the game (manually and on action start), end the game when the action is cancelled, send commands, and repeat prompts. Each intent is handled using a webhook fullfillment running as a Firebase function. The fullfillment has handlers for each intent. The intents are:

* Default Welcome Intent: runs when action is initiated or when user says "Start new game". This intent starts a Zork executable that the user can interact for, kills any running executables.
* repeat: triggered with the phrase "Repeat last prompt" repeats the last output from the Zork executable.
* finish: triggered when the user exits the action, kills running Zork processes.
* Default Fallback Intent: our main intent that process the all other statements (that don't match previous intents) and sends them as commands to the running Zork.


## Running
The backend application can be run with the following:
```
cd node-app
npm start
```
The start script builds the Zork binary w/ make. Their may be error messages if dependencies are not met.

