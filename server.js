var express = require("express"),
	http = require("http"),
	routes = require("./routes"),
	expressHB = require("express-handlebars")
	bodyParser = require("body-parser");

var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.engine("handlebars", expressHB()); 
app.get("/", routes.index);
app.get("/comments", routes.getComments);
app.post("/comments", routes.newComment);
app.post("/comments/:id/like", routes.likeComment);

var server = app.listen(3000, function () {
	console.log("Server is listening at port 3000");
});


