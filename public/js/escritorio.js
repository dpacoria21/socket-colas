//referencias

const $lblDesktop = document.querySelector('h1');
const $btnDispatch = document.querySelector('button');
const $lblTicket = document.querySelector('small');
const $divAlert = document.querySelector('.alert');
const $lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
$lblDesktop.innerText = escritorio;

$divAlert.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    $btnDispatch.disabled = false;

});

socket.on('disconnect', () => {

    $btnDispatch.disabled = true;

});

socket.on('tickets-pendientes', (pends) => {
    if(pends === 0) {
        $lblPendientes.style.display = 'none';
    }else {
        $lblPendientes.style.display = '';
        $lblPendientes.innerText = pends;
    }
});

$btnDispatch.addEventListener( 'click', () => {

    socket.emit('dispatch-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if(!ok) {
            $lblTicket.innerText = 'Nadie'
            return $divAlert.style.display = '';
        }

        $lblTicket.innerText = `Ticket ${ticket.number}`;
    });

    // socket.emit('next-ticket', null, (ticket) => {
        // $labelNewTicket.innerText = ticket;
    // });

});