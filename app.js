var express = require('express'),
    app = express(),
    port = process.env.PORT,
    bodyParser = require('body-parser'),
    todoRoutes = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/views'));
app.use('/api/todos', todoRoutes);
    
app.get("/", function(req, res){
    res.sendFile("index.html");
});

app.listen(port, function(){
    console.log("Server started on port " + port);
});