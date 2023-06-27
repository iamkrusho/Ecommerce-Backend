import TicketModel from "../models/ticketModel.js";
import Ticket from "../../domain/entities/ticket.js";

class TicketMongooseRepository {
    async save(data) {
        const newTicketDoc = new TicketModel(data);
        await newTicketDoc.save();

        return new Ticket({
            id: newTicketDoc._id,
            code: newTicketDoc.code,
            date: newTicketDoc.date,
            total: newTicketDoc.total,
            user: newTicketDoc.user
        });
    }
}

export default TicketMongooseRepository;
