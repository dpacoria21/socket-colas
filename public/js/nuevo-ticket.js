

console.log('Nuevo Ticket HTML');

// Referencias html

const $labelNewTicket = document.querySelector('#lblNuevoTicket');
const $btnCreateTicket = document.querySelector('.btn');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    $btnCreateTicket.disabled = false;

});

socket.on('disconnect', () => {

    $btnCreateTicket.disabled = true;

});

socket.on('last-ticket', (payload) => {
    $labelNewTicket.innerText = `Ticket ${payload}`;
})


$btnCreateTicket.addEventListener( 'click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        $labelNewTicket.innerText = ticket;
    });

});

