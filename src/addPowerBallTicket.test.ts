import { AddPowerballTicket } from './addPowerBallTicket'
import { powerballNumber } from './interfaces/powerballNumber';
import { powerballTicketNumber } from './interfaces/powerballTicketNumber';
import { powerballTicketDrawing } from './interfaces/powerballTicketDrawing';

const powerballNumbers: Array<powerballNumber> = [
    {
        number01: 1,
        number02: 2,
        number03: 3,
        number04: 4,
        number05: 5,
        powerNumber: 6
    },
    {
        number01: 7,
        number02: 8,
        number03: 9,
        number04: 10,
        number05: 11,
        powerNumber: 12
    },
    {
        number01: 13,
        number02: 14,
        number03: 15,
        number04: 16,
        number05: 17,
        powerNumber: 18
    },
    {
        number01: 19,
        number02: 20,
        number03: 21,
        number04: 22,
        number05: 23,
        powerNumber: 24
    },
    {
        number01: 25,
        number02: 26,
        number03: 27,
        number04: 28,
        number05: 29,
        powerNumber: 30
    }
];

describe('Add Powerball Ticket', () => {
    it('Add real ticket', async () => {
        const numbers: Array<powerballNumber> = [
            { number01: 15, number02: 21, number03: 39, number04: 58, number05: 66, powerNumber: 6 },
            { number01: 4, number02: 10, number03: 36, number04: 60, number05: 62, powerNumber: 22 },
            { number01: 6, number02: 32, number03: 43, number04: 57, number05: 65, powerNumber: 24 },
            { number01: 34, number02: 43, number03: 49, number04: 51, number05: 67, powerNumber: 26 },
            { number01: 3, number02: 8, number03: 16, number04: 40, number05: 58, powerNumber: 19 }
        ]
        await AddPowerballTicket(new Date('11/23/2019'), true, numbers, 5, null);
    }, 10000000);

    it('Should be golden path', async () => {
        const purchaseDate = new Date('11/9/2019');
        const cost = 75;
        const powerplay = true;
        const powerballTicketPurchase = await AddPowerballTicket(purchaseDate, powerplay, powerballNumbers, 5, null);

        //Check powerball ticket
        expect(powerballTicketPurchase.ticket.cost).toBe(cost);
        expect(powerballTicketPurchase.ticket.powerPlay).toBe(powerplay);
        expect(powerballTicketPurchase.ticket.purchaseDate).toBe(purchaseDate);
        expect(powerballTicketPurchase.ticket.ticketId).toBeDefined();
        expect(powerballTicketPurchase.ticket.createDate).toBeDefined();
        expect(powerballTicketPurchase.ticket.updateDate).toBeDefined();
        expect(powerballTicketPurchase.ticket.ownerId).toBeUndefined();

        //Check powerball ticket numbers
        expect(powerballTicketPurchase.numbers).toEqual(
            expect.arrayContaining(powerballNumbers.map((number: powerballNumber) => {
                return expect.objectContaining(number);
            }))
        );
        powerballTicketPurchase.numbers.forEach((number: powerballTicketNumber) => {
            expect(number.ticketId).toBe(powerballTicketPurchase.ticket.ticketId);
            expect(number.ticketNumberId).toBeDefined();
            expect(number.createDate).toBe(powerballTicketPurchase.ticket.createDate);
            expect(number.updateDate).toBe(powerballTicketPurchase.ticket.updateDate);
        });

        //Check powerball ticket drawings    
        const expectedDrawingDates = [
            new Date('11/9/2019'),
            new Date('11/13/2019'),
            new Date('11/16/2019'),
            new Date('11/20/2019'),
            new Date('11/23/2019')
        ];
        expect(powerballTicketPurchase.drawings.map((drawing: powerballTicketDrawing) => {
            return drawing.drawingDate;
        })).toEqual(expectedDrawingDates);
        powerballTicketPurchase.drawings.forEach((drawing: powerballTicketDrawing) => {
            expect(drawing.ticketId).toBe(powerballTicketPurchase.ticket.ticketId);
            expect(drawing.createDate).toBe(powerballTicketPurchase.ticket.createDate);
            expect(drawing.updateDate).toBe(powerballTicketPurchase.ticket.updateDate);
        });
    });
});