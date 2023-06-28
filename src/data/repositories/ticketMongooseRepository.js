import TicketModel from "../models/ticketModel.js";
import Ticket from "../../domain/entities/ticket.js";

class TicketMongooseRepository {
    async find() {
        const ticketsDocs = await TicketModel.find();

        return (!ticketsDocs > 0) ? null : ticketsDocs.map((doc) => new Ticket({
            id: doc._id,
            code: doc.code,
            date: doc.date,
            total: doc.total,
            user: doc.user
        }));
    }

    async findOne(id) {
        const ticketDoc = await TicketModel.findById(id);

        return (!ticketDoc) ? null : new Ticket({
            id: ticketDoc._id,
            code: ticketDoc.code,
            date: ticketDoc.date,
            total: ticketDoc.total,
            user: ticketDoc.user
        });
    }

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

    async delete(id) {
        const ticketDoc = await TicketModel.findByIdAndDelete(id);

        return (!ticketDoc) ? null : true;
    }
}

export default TicketMongooseRepository;
