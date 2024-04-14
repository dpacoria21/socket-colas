const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });



    socket.emit('last-ticket', ticketControl.last);

    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next();
        callback(next);


    })

}



module.exports = {
    socketController
}

