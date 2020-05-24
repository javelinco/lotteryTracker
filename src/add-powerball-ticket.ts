import { v4 as uuidv4 } from 'uuid';
import { Client } from 'ts-postgres';
import { PowerballNumber } from './interfaces/powerball-number';
import { PowerballTicket } from './interfaces/powerball-ticket';
import { PowerballTicketNumber } from './interfaces/powerball-ticket-number';
import { PowerballTicketPurchase } from './interfaces/powerball-ticket-purchase';
import { PowerballTicketDrawing } from './interfaces/powerball-ticket-drawing';
import { postgresConfig } from './configuration/postgress-config';
import * as moment from 'moment';
import { dateTimeFormat, dateFormat } from './helpers/date-format';
import Logger from './helpers/logger';

export type databaseSaveFunc = (purchase: PowerballTicketPurchase) => Promise<void>;

export async function addPowerballTicket(
  purchaseDate: Date,
  powerPlay: boolean,
  numbers: Array<PowerballNumber>,
  drawings: number,
  databaseSave: databaseSaveFunc | null = recordPurchase
): Promise<PowerballTicketPurchase> {
  const currentDate = new Date();

  const powerballTicketItem: PowerballTicket = {
    ticketId: uuidv4(),
    purchaseDate: purchaseDate,
    cost: numbers.length * drawings * (powerPlay ? 3 : 2),
    powerPlay: powerPlay,
    createDate: currentDate,
    updateDate: currentDate
  };

  const powerballNumbers: Array<PowerballTicketNumber> = numbers.map((number: PowerballNumber) => {
    return {
      ticketNumberId: uuidv4(),
      ticketId: powerballTicketItem.ticketId,
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

  const powerballTicketDrawings: Array<PowerballTicketDrawing> = getPowerballDrawingDates(purchaseDate, drawings).map(
    (drawingDate: Date) => {
      return {
        ticketId: powerballTicketItem.ticketId,
        drawingDate: drawingDate,
        createDate: currentDate,
        updateDate: currentDate
      };
    }
  );

  const powerballTicketPurchase: PowerballTicketPurchase = {
    ticket: powerballTicketItem,
    numbers: powerballNumbers,
    drawings: powerballTicketDrawings
  };

  if (databaseSave) {
    await databaseSave(powerballTicketPurchase);
  }

  return powerballTicketPurchase;
}

async function recordPurchase(purchase: PowerballTicketPurchase): Promise<void> {
  const client = new Client(postgresConfig);
  try {
    await client.connect();

    //PowerballTicket
    const powerballTicketQuery =
      `${'INSERT INTO PowerballTicket ' +
        '(TicketId, PurchaseDate, Cost, PowerPlay, OwnerId, CreateDate, UpdateDate) ' +
        'VALUES ( ' +
        `'${purchase.ticket.ticketId}', ` +
        `'${moment(purchase.ticket.purchaseDate).format(dateFormat)}', ` +
        `${purchase.ticket.cost}, ` +
        `${purchase.ticket.powerPlay}, `}${purchase.ticket.ownerId === undefined ? 'NULL, ' : `'${purchase.ticket.ownerId}', `}'${moment(
        purchase.ticket.createDate
      ).format(dateTimeFormat)}' ,` +
      `'${moment(purchase.ticket.updateDate).format(dateTimeFormat)}') ` +
      `ON CONFLICT (TicketId) DO UPDATE ` +
      `SET PurchaseDate = '${moment(purchase.ticket.purchaseDate).format(dateFormat)}', ` +
      ` Cost = ${purchase.ticket.cost}, ` +
      ` PowerPlay = ${purchase.ticket.powerPlay}, ` +
      ` OwnerId = ${purchase.ticket.ownerId === undefined ? 'NULL' : `'${purchase.ticket.ownerId}'`}, ` +
      ` UpdateDate = '${moment(purchase.ticket.updateDate).format(dateTimeFormat)}'`;
    await client.query(powerballTicketQuery);

    //PowerballTicketNumbers
    purchase.numbers.forEach(async number => {
      const powerballTicketNumberQuery =
        'INSERT INTO PowerballTicketNumber ' +
        '(TicketNumberId, TicketId, Number01, Number02, Number03, Number04, Number05, PowerNumber, CreateDate, UpdateDate) ' +
        'VALUES ( ' +
        `'${number.ticketNumberId}', ` +
        `'${number.ticketId}', ` +
        `${number.number01}, ` +
        `${number.number02}, ` +
        `${number.number03}, ` +
        `${number.number04}, ` +
        `${number.number05}, ` +
        `${number.powerNumber}, ` +
        `'${moment(purchase.ticket.createDate).format(dateTimeFormat)}' ,` +
        `'${moment(purchase.ticket.updateDate).format(dateTimeFormat)}') ` +
        'ON CONFLICT (TicketNumberId) DO UPDATE ' +
        `SET TicketId = '${number.ticketId}', ` +
        ` Number01 = ${number.number01}, ` +
        ` Number02 = ${number.number02}, ` +
        ` Number03 = ${number.number03}, ` +
        ` Number04 = ${number.number04}, ` +
        ` Number05 = ${number.number05}, ` +
        ` PowerNumber = ${number.powerNumber}, ` +
        ` UpdateDate = '${moment(purchase.ticket.updateDate).format(dateTimeFormat)}'`;
      await client.query(powerballTicketNumberQuery);
    });

    //PowerballTicketDrawing
    purchase.drawings.forEach(async drawing => {
      const powerballTicketDrawingQuery =
        'INSERT INTO PowerballTicketDrawing ' +
        '(TicketId, DrawingDate, CreateDate, UpdateDate) ' +
        'VALUES ( ' +
        `'${drawing.ticketId}', ` +
        `'${moment(drawing.drawingDate).format(dateFormat)}', ` +
        `'${moment(purchase.ticket.createDate).format(dateTimeFormat)}' ,` +
        `'${moment(purchase.ticket.updateDate).format(dateTimeFormat)}') ` +
        'ON CONFLICT (TicketId, DrawingDate) DO NOTHING ';
      await client.query(powerballTicketDrawingQuery);
    });
  } catch (e) {
    Logger.instance.error('Error encountered while inserting data:', e);
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

  const referenceDate = new Date(purchaseDate);
  referenceDate.setHours(0, 0, 0, 0);

  const drawingDates: Array<Date> = [];

  for (let index = 0; index < drawings; index++) {
    const nextWednesday: Date = new Date(referenceDate);
    nextWednesday.setDate(nextWednesday.getDate() + ((wednesdayDayOfWeek + lengthOfWeek - nextWednesday.getDay()) % 7));

    const nextSaturday: Date = new Date(referenceDate);
    nextSaturday.setDate(nextSaturday.getDate() + ((saturdayDayOfWeek + lengthOfWeek - nextSaturday.getDay()) % 7));

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
