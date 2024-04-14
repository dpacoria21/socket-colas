const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) { 
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {

        this.last = 0;
        this.now = new Date().getDate(); // 1 - 31
        this.tickets = [];
        this.latest4 = [];

        this.init();
    }

    get toJSON(){
        return {
            last: this.last,
            now: this.now,
            tickets: this.tickets,
            latest4: this.latest4,
        }
    }

    init() {
        const {now, last, latest4, tickets} = require('../db/data.json');
        if(now == this.now) {
            this.tickets = tickets;
            this.last = last;
            this.latest4 = latest4;
        }else {
            this.saveDB();
        }
    }

    saveDB() {
        
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));

    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveDB();
        return `Ticket ${ticket.number}`;
    }

    dispatchTicket(desktop) {
        // No tenemos tickets
        if(this.tickets.length === 0) return null;

        const ticket = this.tickets.shift(); //this.tickets[0];
        ticket.desktop = desktop;

        this.latest4.unshift( ticket );
        if(this.latest4.length > 4) {
            this.latest4.pop();
        }

        this.saveDB();

        return ticket;
        // console.log(this.latest4);

    }

}

module.exports = TicketControl