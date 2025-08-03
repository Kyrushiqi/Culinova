const socket = io();

const clientsTotal = document.getElementById('clients-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

socket.emit('set-name', nameInput.value);
nameInput.addEventListener('change', (e) => {
    socket.emit('set-name', e.target.value);
});

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Users: ${data}`;
});

function sendMessage() {
    if (messageInput.value === '') return;
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date(),
    };
    socket.emit('message', data);
    addMessageToUI(true, data);
    messageInput.value = '';
    socket.emit('feedback', { feedback: '' });
}

socket.on('chat-message', (data) => {
    addMessageToUI(false, data);
});

socket.on('user-joined', (data) => {
    addSystemMessageToUI(`${data.name} has joined the chat`);
});

socket.on('user-disconnected', (data) => {
    addSystemMessageToUI(`${data.name} has left the chat`);
});

socket.on('user-renamed', (data) => {
    addSystemMessageToUI(`${data.oldName} is now known as ${data.newName}`);
});

function addMessageToUI(isOwnMessage, data) {
    const element = `
        <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
            <p class="message">
                ${data.message}
            </p>
            <span>${data.name} ● <time class="timestamp" datetime="${new Date(data.dateTime).toISOString()}">${moment(data.dateTime).fromNow()}</time></span>
        </li>`;
    messageContainer.innerHTML += element;
    scrollToBottom();
}

function addSystemMessageToUI(message) {
    const element = `
        <li class="message-feedback">
            <p class="feedback">${message}</p>
        </li>`;
    messageContainer.innerHTML += element;
    scrollToBottom();
}

function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener('input', () => {
    socket.emit('feedback', {
        feedback: messageInput.value === '' ? '' : `${nameInput.value} is typing...`,
    });
});

socket.on('feedback', (data) => {
    clearFeedback();
    if (data.feedback !== '') {
        const element = `
            <li class="message-feedback">
                <p class="feedback" id="feedback">${data.feedback}</p>
            </li>`;
        messageContainer.innerHTML += element;
        scrollToBottom();
    }
});

function clearFeedback() {
    document.querySelectorAll('li.message-feedback').forEach(element => {
        element.parentNode.removeChild(element);
    });
}

function updateTimestamps() {
    const timestamps = document.querySelectorAll('.timestamp');
    timestamps.forEach(ts => {
        ts.innerText = moment(ts.getAttribute('datetime')).fromNow();
    });
}

setInterval(updateTimestamps, 10000);