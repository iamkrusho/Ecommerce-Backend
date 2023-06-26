import TicketModel from "../models/ticketModel.js";
import Ticket from "../../domain/entities/ticket.js";

class TicketMongooseRepository {
    async save(data) {
        const newTicketDoc = new TicketModel(data);
        await newTicketDoc.save();

        return new Ticket({
            id: newTicketDoc._id,
            purchase_datetime: newTicketDoc.purchase_datetime,
            amount: newTicketDoc.amount,
            purchaser: newTicketDoc.purchaser
        });
    }
}

export default TicketMongooseRepository;
