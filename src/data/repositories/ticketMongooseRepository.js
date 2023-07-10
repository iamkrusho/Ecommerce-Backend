import TicketModel from "../models/ticketModel.js";
import Ticket from "../../domain/entities/ticket.js";

class TicketMongooseRepository {
    async find() {
        const ticketsDocs = await TicketModel.find();

        return ticketsDocs > 0 ? ticketsDocs.map((doc) => new Ticket({
            id: doc._id,
            code: doc.code,
            date: doc.date,
            total: doc.total,
            user: doc.user
        })) : null;
    }

    async findOne(id) {
        const ticketDoc = await TicketModel.findById(id);

        return ticketDoc ? new Ticket({
            id: ticketDoc._id,
            code: ticketDoc.code,
            date: ticketDoc.date,
            total: ticketDoc.total,
            user: ticketDoc.user
        }) : null;
    }

    async save(data) {
        const newTicketDoc = new TicketModel(data);
        const ticketDoc = await newTicketDoc.save();

        return ticketDoc ? new Ticket({
            id: ticketDoc._id,
            code: ticketDoc.code,
            date: ticketDoc.date,
            total: ticketDoc.total,
            user: ticketDoc.user
        }) : null;
    }

    async delete(id) {
        const ticketDoc = await TicketModel.findByIdAndDelete(id);

        return ticketDoc ?  true : null;
    }
}

export default TicketMongooseRepository;
