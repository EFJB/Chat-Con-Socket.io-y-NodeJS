var socket = io.connect('http://192.168.88.243:6677', {'forceNew':true});

socket.on('mensajes', function(data){
    console.log(data);
    mostrar(data)
});

function mostrar(data){
    var html = data.map(function(mensaje, indice){
        return (`
            <div class="mensaje">
                <strong>${mensaje.nickname}</strong</> dice:
                <p>${mensaje.texto}</p>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('mensajes')
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var mensaje = {
        nickname: document.getElementById('nickname').value,
        texto: document.getElementById('texto').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', mensaje);
    
    return false;
}