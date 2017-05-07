const express = require("express"),
	path = require("path"),
	port = process.env.PORT || 8080,
	app = express();

app.set(port);

app.use(express.static(__dirname + "/build"));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "/build", "index.html"))
});
app.listen(app.get('port'), () => {
	console.log('Node app is running on port', port);
});

