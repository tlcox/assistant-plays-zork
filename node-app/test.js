const express = require('express');
const body_parser = require('body-parser');
const spawn = require('child_process').spawn;
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

app.use(body_parser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let responses = [];
let zork;


app.post('/', (req, res) => {
	console.log(JSON.stringify(req.body));
	res.send('done');
});