import TicketModel from "../models/ticketModel";

class TicketMongooseRepository {
    async save() {
        const newTicketDoc = new TicketModel();
        await newTicketDoc.save();

        return true;
    }
}

export default TicketMongooseRepository;
