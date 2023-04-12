var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
   console.log("hello")
})
app.listen(8081, function () {
   console.log("Example app listening at http://localhost:8081")
})
