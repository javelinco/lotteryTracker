import { powerballNumber } from "./interfaces/powerballNumber";
import { powerballTicket } from "./interfaces/powerballTicket";
import { v4 as uuid } from 'uuid';
import { powerballTicketNumber } from "./interfaces/powerballTicketNumber";
import { powerballTicketPurchase } from "./interfaces/powerballTicketPurchase";
import { powerballTicketDrawing } from "./interfaces/powerballTicketDrawing";

export function AddPowerballTicket(purchaseDate: Date,
                                   cost: number,
                                   powerPlay: boolean,
                                   numbers: Array<powerballNumber>,
                                   drawings: number): powerballTicketPurchase {
    const currentDate = new Date();

    const powerballTicket: powerballTicket = {
        ticketId: uuid(),
        purchaseDate: purchaseDate,
        cost: cost,
        powerPlay: powerPlay,
        createDate: currentDate,
        updateDate: currentDate
    };

    const powerballNumbers: Array<powerballTicketNumber> =
        numbers.map((number: powerballNumber) => {
            return {
                ticketNumberId: uuid(),
                ticketId: powerballTicket.ticketId,
                number01: number.number01,
                number02: number.number02,
                number03: number.number03,
                number04: number.number04,
                number05: number.number05,
                powerNumber: number.powerNumber,
                createDate: currentDate,
                updateDate: currentDate
            };
    });

    const powerballTicketDrawings: Array<powerballTicketDrawing> = 
        getPowerballDrawingDates(purchaseDate, drawings).map((drawingDate: Date) => {
            return {
                ticketId: powerballTicket.ticketId,
                drawingDate: drawingDate,
                createDate: currentDate,
                updateDate: currentDate
            }
    });

    return {        
        ticket: powerballTicket,
        numbers: powerballNumbers,
        drawings: powerballTicketDrawings
    };
}

function getPowerballDrawingDates(purchaseDate: Date, drawings: number): Array<Date> {
    const wednesdayDayOfWeek = 3;
    const saturdayDayOfWeek = 6;
    const lengthOfWeek = 7;

    let referenceDate = new Date(purchaseDate);
    referenceDate.setHours(0, 0, 0, 0);

    let drawingDates: Array<Date> = [];

    for (let index = 0; index < drawings; index++) {
        const nextWednesday: Date = new Date(referenceDate);
        nextWednesday.setDate(nextWednesday.getDate() + (wednesdayDayOfWeek + lengthOfWeek - nextWednesday.getDay()) % 7);

        const nextSaturday: Date = new Date(referenceDate);
        nextSaturday.setDate(nextSaturday.getDate() + (saturdayDayOfWeek + lengthOfWeek - nextSaturday.getDay()) % 7);

        let nextDrawing: Date;
        if (nextWednesday > nextSaturday) {
            nextDrawing = new Date(nextSaturday);
        } else {
            nextDrawing = new Date(nextWednesday);
        }
        drawingDates.push(nextDrawing);

        referenceDate.setDate(nextDrawing.getDate() + 1);
    }
    return drawingDates;
}