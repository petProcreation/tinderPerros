const socket = io('/');
// Este valor debe regresar con quién está chateando el usuario principal
const userChat = document.getElementById('userChat').value;
const chat = document.getElementById('chat');


socket.emit('joinedRoom', { room: `${userChat}` });


document.getElementById('sendTrigger').addEventListener('click', () => {    
    const message = document.getElementById('message').value;

    // Agregar la data que necesitemos 
    socket.emit('sendNewMessage', { message });

    const newMessage = document.createElement('div');
    newMessage.classList.add('messageSent');
    chat.appendChild(newMessage);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('messageRecieved', (data) => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('messageRecieved');
    newMessage.innerHTML = data.message;
    chat.appendChild(newMessage);
    window.scrollTo(0, document.body.scrollHeight);
});

