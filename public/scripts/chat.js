const socket = io('/');
// Este valor debe regresar con quién está chateando el usuario principal
const chat =  document.getElementById('chat-messages');

function openChat(chatName) {    
    socket.emit('joinedRoom', {
        room: `${chatName}`,
        // Aquí debería ir el usuario logeado
        user: `logedInUser`,
        chattingTo: `${chatName}`
    });

    document.getElementById('chat-list').classList.add('d-none');
    document.getElementById('chat').classList.remove('d-none');
    document.getElementById('chattingTo').innerText = chatName;


    
}

function goBackToList() {
    document.getElementById('chat').classList.add('d-none');
    document.getElementById('chat-list').classList.remove('d-none');
}



document.getElementById('send-button').addEventListener('click', () => {    
    const message = document.getElementById('message-input').value;

    // Agregar la data que necesitemos 
    socket.emit('sendNewMessage', { message });

    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.classList.add('sent');
    newMessage.innerText = message;
    chat.appendChild(newMessage);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('messageRecieved', (data) => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.classList.add('received');
    newMessage.innerHTML = data.message;
    chat.appendChild(newMessage);
    window.scrollTo(0, document.body.scrollHeight);
});


function openChat(chatName) {
    document.getElementById('chat-list').classList.add('d-none');
    document.getElementById('chat').classList.remove('d-none');
    document.getElementById('chattingTo').innerText = chatName;
}