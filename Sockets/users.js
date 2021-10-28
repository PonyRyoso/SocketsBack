const users = []

const addUser = (id, name, room) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error:   "Usuario ya ha sido Agregado" }
    if (!name && !room) return { error: "Usuario y Sala Requerido" }
    if (!name) return { error: "Nombre de Usuario es requerido" }
    if (!room) return { error: "Sala es requerida" }

    const user = { id, name, room }
    users.push(user)
    return { user }
}

const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUsers = (room) => users.filter(user => {
    return user.room === room;
})

const connect = (socket) => {
    console.log("Conectado",socket.id);
};

// FUNCION DE LOGIN PARA MANEJAR SOCKETS POR SEPARADO
const login = (socket, data, callback) => {
    const { user, error } = addUser(socket.id, data.name, data.room)
    if (error) return callback(error);
    socket.join(user.room);

    socket.to(data.room).emit('notification', { detail: `El usuario ${user.name} acaba de entrar a la sala ${user.room}` });
    // global.io.in(data.room).emit('users', getUsers(data.room));
    // console.log(getUsers(data.room));
    return callback();
};

module.exports = { addUser, getUser, deleteUser, getUsers, login, connect }