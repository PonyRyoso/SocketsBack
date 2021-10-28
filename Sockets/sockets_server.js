const express = require('express');
const app     = express();
const cors    = require('cors');
const { addUser, getUser, deleteUser, getUsers, login, connect } = require('./users')

//CONFIGURACIONES
app.use(cors());
app.options('*', cors());

app.set('port', process.env.PORT || 4000);
app.set('host', process.env.HOST || "0.0.0.0");

//INICIALIZAR SERVIDOR
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor Sockets en el puerto",app.get('port') )
});

//WEBSOCKETS
global.io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

//CONECTAR SOCKET
global.io.on("connect", socket=>{
    connect(socket);
    
    socket.on('login', (data, callback) => login(socket, data, callback));

    // Servidor escuchando para Agregar a Sala Especifica 
    socket.on('room', (data)=>{
        console.log(data)
    })
    
    //Servidor Desconectado
    socket.on("disconnect", (v)=> {
           console.log("Desconectado", socket.id);
           const user = deleteUser(socket.id);
           console.log(user);
           if (user) {
            global.io.in(user.room).emit('notification', {detail: `El usuario ${user.name} acaba de salir de la sala ${user.room}`  })
            global.io.in(user.room).emit('users', getUsers(user.room));
               console.log(getUsers(user.room))
           }
    })
});

