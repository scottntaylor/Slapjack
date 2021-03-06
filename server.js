
var express = require ("express");
var app = express();
var PORT = process.env.PORT || 8080
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
const path = require("path");


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/jsTest.html'));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });