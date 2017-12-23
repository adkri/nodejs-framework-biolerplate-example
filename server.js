var app = require('./app.js')

var port = process.env.port || 2333;

app.listen(port);
console.log("App listening in port : "+ port);