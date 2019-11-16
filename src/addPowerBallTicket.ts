import { v4 as uuid } from 'uuid';
import { Client } from 'ts-postgres';
import { powerballNumber } from "./interfaces/powerballNumber";
import { powerballTicket } from "./interfaces/powerballTicket";
import { powerballTicketNumber } from "./interfaces/powerballTicketNumber";
import { powerballTicketPurchase } from "./interfaces/powerballTicketPurchase";
import { powerballTicketDrawing } from "./interfaces/powerballTicketDrawing";
import { postgresConfig } from './configuration/postgressConfig';
import * as moment from 'moment';
import { dateTimeFormat, dateFormat } from './helpers/dateFormat';

export type databaseSaveFunc = (purchase: powerballTicketPurchase) => Promise<void>;

export async function AddPowerballTicket(
        purchaseDate: Date,
        powerPlay: boolean,
        numbers: Array<powerballNumber>,
        drawings: number,
        databaseSave: databaseSaveFunc = recordPurchase): Promise<powerballTicketPurchase> {
    const currentDate = new Date();

    const powerballTicket: powerballTicket = {
        ticketId: uuid(),
        purchaseDate: purchaseDate,
        cost: numbers.length * drawings * (powerPlay ? 3 : 2),
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

    const powerballTicketPurchase: powerballTicketPurchase = {        
        ticket: powerballTicket,
        numbers: powerballNumbers,
        drawings: powerballTicketDrawings
    };

    if (databaseSave) {
        await databaseSave(powerballTicketPurchase);
    }

    return powerballTicketPurchase;
}

async function recordPurchase(purchase: powerballTicketPurchase): Promise<void> {
    const client = new Client(postgresConfig);
    try {
        await client.connect();

        //PowerballTicket
        const powerballTicketQuery = 'INSERT INTO PowerballTicket '
            + '(TicketId, PurchaseDate, Cost, PowerPlay, OwnerId, CreateDate, UpdateDate) '
            + 'VALUES ( '
            + `'${purchase.ticket.ticketId}', `
            + `'${moment(purchase.ticket.purchaseDate).format(dateFormat)}', `
            + `${purchase.ticket.cost}, `
            + `${purchase.ticket.powerPlay}, `
            + (purchase.ticket.ownerId === undefined ? 'NULL, ' : `'${purchase.ticket.ownerId}', `)
            + `'${moment(purchase.ticket.createDate).format(dateTimeFormat)}' ,`
            + `'${moment(purchase.ticket.updateDate).format(dateTimeFormat)}') `
            + 'ON CONFLICT (TicketId) DO UPDATE '
            + `SET PurchaseDate = '${moment(purchase.ticket.purchaseDate).format(dateFormat)}', `
            + ` Cost = ${purchase.ticket.cost}, `
            + ` PowerPlay = ${purchase.ticket.powerPlay}, `
            + ' OwnerId = ' + (purchase.ticket.ownerId === undefined ? 'NULL' : `'${purchase.ticket.ownerId}'`) + ', '
            + ` UpdateDate = '${moment(purchase.ticket.updateDate).format(dateTimeFormat)}'`;
        await client.query(powerballTicketQuery);

        //PowerballTicketNumbers
        purchase.numbers.forEach(async (number) => {
            const powerballTicketNumberQuery = 'INSERT INTO PowerballTicketNumber '
                + '(TicketNumberId, TicketId, Number01, Number02, Number03, Number04, Number05, PowerNumber, CreateDate, UpdateDate) '
                + 'VALUES ( '
                + `'${number.ticketNumberId}', `
                + `'${number.ticketId}', `
                + `${number.number01}, `
                + `${number.number02}, `
                + `${number.number03}, `
                + `${number.number04}, `
                + `${number.number05}, `
                + `${number.powerNumber}, `
                + `'${moment(purchase.ticket.createDate).format(dateTimeFormat)}' ,`
                + `'${moment(purchase.ticket.updateDate).format(dateTimeFormat)}') `
                + 'ON CONFLICT (TicketNumberId) DO UPDATE '
                + `SET TicketId = '${number.ticketId}', `
                + ` Number01 = ${number.number01}, `
                + ` Number02 = ${number.number02}, `
                + ` Number03 = ${number.number03}, `
                + ` Number04 = ${number.number04}, `
                + ` Number05 = ${number.number05}, `
                + ` PowerNumber = ${number.powerNumber}, `
                + ` UpdateDate = '${moment(purchase.ticket.updateDate).format(dateTimeFormat)}'`;
            await client.query(powerballTicketNumberQuery);
        });

        //PowerballTicketDrawing
        purchase.drawings.forEach(async (drawing) => {
            const powerballTicketDrawingQuery = 'INSERT INTO PowerballTicketDrawing '
                + '(TicketId, DrawingDate, CreateDate, UpdateDate) '
                + 'VALUES ( '
                + `'${drawing.ticketId}', `
                + `'${moment(drawing.drawingDate).format(dateFormat)}', `
                + `'${moment(purchase.ticket.createDate).format(dateTimeFormat)}' ,`
                + `'${moment(purchase.ticket.updateDate).format(dateTimeFormat)}') `
                + 'ON CONFLICT (TicketId, DrawingDate) DO NOTHING ';
            await client.query(powerballTicketDrawingQuery);
        });
    } catch (e) {
        console.log('Error encountered while inserting data:', e)
    } finally {
        if (!client.closed) {
            await client.end();
        }
    }
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