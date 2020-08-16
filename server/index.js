var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

var mensajes = [{
    id: 1,
    texto: 'Bienvenido al chat privado de Engelbert',
    nickname: 'Bot - Fanor.io'
}];

io.on('connection', function(socket){
    console.log('El cliente con IP: ' + socket.handshake.address + 'Se ha conectado...');
    socket.emit('mensajes', mensajes);

    socket.on('add-message', function(data){
        mensajes.push(data);

        io.sockets.emit('mensajes', mensajes)
    });
});

server.listen(6677, function(){
    console.log('Server Success at http://localhost:6677');
});