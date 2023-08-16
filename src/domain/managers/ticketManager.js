import { nanoid } from "nanoid";

import container from "../../container";

class TicketManager {
    #TicketRepository = container.resolve("TicketRepository");

    async getAll() {
        return await this.#TicketRepository.find();
    }

    async getOne(id) {
        return await this.#TicketRepository.findOne(id);
    }

    async create(data) {
        return await this.#TicketRepository.save({ ...data, code: nanoid(13) });
    }

    async deleteOne(id) {
        return await this.#TicketRepository.delete(id);
    }
}

export default TicketManager;
