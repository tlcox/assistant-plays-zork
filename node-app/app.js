const express = require('express');
const body_parser = require('body-parser');
const spawn = require('child_process').spawn;
const app = express();
const port = 8000;

app.use(body_parser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let responses = [];
let zork;

app.get('/', (req, res) => {
	console.log('get');
	response = {
		message: responses[responses.length - 1]
	};
	res.send(JSON.stringify(response));
});

app.post('/', (req, res) => {
	console.log('post');
	let cmd = req.body.cmd + "\n";
	zork.stdin.write(cmd);
	setTimeout(function () {
		response = {
			message: responses[responses.length - 1]
		};
		res.json(response);
	}, 10);

});

app.get('/startGame', (req, res) => {
	if (zork) {

	}
	zork = spawn('./zork');
	zork.stdout.on('data', (data) => {
		responses.push(data.toString());
	});
	res.send(JSON.stringify('game started'));
});