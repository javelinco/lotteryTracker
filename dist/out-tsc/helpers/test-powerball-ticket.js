"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
function createTicket(ticketId, ownerId) {
    if (ownerId === void 0) { ownerId = uuid_1.v4(); }
    return {
        ticketId: ticketId,
        purchaseDate: new Date('1/1/2000'),
        cost: 100.0,
        powerPlay: true,
        ownerId: ownerId,
        createDate: new Date('1/1/2000'),
        updateDate: new Date('1/1/2000')
    };
}
exports.createTicket = createTicket;
