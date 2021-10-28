const express = require('express');
const app     = express();
const cors    = require('cors');

const socket = require('./Sockets/sockets_server')

//CONFIGURACIONES
app.use(cors());
app.options('*', cors());

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || "0.0.0.0");

//INICIALIZAR SERVIDOR
app.listen(app.get('port'), ()=>{
    console.log("Servidor Express en el puerto",app.get('port') )
});

app.use("/Api",  require("./routes"));

// PEER SERVER
const { PeerServer } = require("peer");
const peerServer = PeerServer({
    port: 3500,
    path: "/",
    proxied: true
});

peerServer.listen(()=> console.log("Peer on 0.0.0.0", 3500));
