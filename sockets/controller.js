const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-state', ticketControl.latest4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    // socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    // event = ticket-pendientes;

    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });


    socket.on('next-ticket', ( payload, callback ) => {
        const next = ticketControl.next();

        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        callback(next);

    })


    socket.on('dispatch-ticket', (payload, callback) => {
        
        const {escritorio} = payload;
        if(!escritorio) {
            return callback('El escritorio no vino en la peticion');
        }

        const ticket = ticketControl.dispatchTicket(escritorio);

        socket.broadcast.emit('actual-state', ticketControl.latest4);

        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        // Notificar cambios en los ultimos 4

        if(!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes',
            });
        }else {
            callback({
                ok: true,
                ticket
            })
        }

        callback({
            escritorio,
            id: 123
        })

    })

}



module.exports = {
    socketController
}

