import { nanoid } from "nanoid";

import container from "../../container";

class TicketManager {
    #TicketRepository = container.resolve("TicketRepository");

    async create(data) {
        return await this.#TicketRepository.save({...data, code: nanoid(13)})
    }
}

export default TicketManager;
