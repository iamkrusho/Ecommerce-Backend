import { Schema, model } from "mongoose";

const ticketCollection = "roles";

const TicketSchema = new Schema({
    code: {
        type: Schema.Types.String,
        required: [true, 'Ticket code is required'],
        unique: true,
    },
    purchase_datetime: {
        type: Schema.Types.Date,
        required: [true, "Ticket date is required"],
    },
    amount: {
        type: Schema.Types.Number,
        required: [true, "Ticket amount is required"],
    },
    purchaser: {
        type: Schema.Types.String,
        required: [true, "Ticket purchaser is required"],
    },
});

export const TicketModel = model(ticketCollection, TicketSchema);
