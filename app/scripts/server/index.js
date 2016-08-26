const port = 8080;
const app = require('express')();

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.listen(port, () => {
	console.log(`Listening on ${port} port`);
});
