import { Schema, model } from "mongoose";

const ticketCollection = "tickets";

const TicketSchema = new Schema({
    code: {
        type: Schema.Types.String,
        required: [true, "Ticket code is required"],
        unique: true
    },
    date: {
        type: Schema.Types.Date,
        required: [true, "Ticket date is required"]
    },
    total: {
        type: Schema.Types.Number,
        required: [true, "Ticket amount is required"]
    },
    user: {
        type: Schema.Types.String,
        required: [true, "Ticket purchaser is required"]
    }
});

export default model(ticketCollection, TicketSchema);
