const express = require('express');
const body_parser = require('body-parser');
const spawn = require('child_process').spawn;
const app = express();
const port = 8000;
const cors = require('cors');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
app.use(cors());

app.use(body_parser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let responses = [];
let zork;

app.get('/', (req, res) => {
	console.log('repeat');
	if (!zork) {
		response = {
			message: 'No game is in progress.'
		};
		res.json(response);
		return;
	}
	response = {
		message: responses[responses.length - 1]
	};
	res.json(response);
});

app.post('/', async (req, res) => {
	console.log('command');
	if (!zork) {
		response = {
			message: 'No game is in progress.'
		};
		res.json(response);
		return;
	}
	let cmd = req.body.cmd + "\n";
	zork.stdin.write(cmd);

	await delay(20);
	response = {
		message: responses[responses.length - 1]
	};
	res.json(response);

});

app.get('/startGame', async (req, res) => {
	console.log('new game');
	if (zork) {
		zork.kill();
		await delay(20);
	}
	zork = spawn('./zork');
	zork.stdout.on('data', (data) => {
		responses.push(data.toString());
	});

	await delay(20);
	response = {
		message: responses[responses.length - 1]
	};
	res.json(response);

});

app.get('/end', async (req, res) => {
	console.log('end');
	if (!zork) {
		response = {
			message: 'No game is in progress.'
		};
		res.json(response);
		return;
	}
	zork.kill();

	await delay(20);
	response = {
		message: 'Game ended, goodbye.'
	};
	res.json(response);
});