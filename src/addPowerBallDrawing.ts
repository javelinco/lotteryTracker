import { powerballNumber } from './interfaces/powerballNumber';
import { ownerWinning } from './interfaces/ownerWinning';
import { Client } from 'ts-postgres';
import { postgresConfig } from './configuration/postgressConfig';
import * as moment from 'moment';
import { powerballDrawing } from './interfaces/powerballDrawing';
import { drawingNumber } from './interfaces/drawingNumber';
import { dateTimeFormat, dateFormat } from './helpers/dateFormat';

export type recordDrawingFunc = (drawing: powerballDrawing) => Promise<void>;
export type getDrawingNumbersFunc = (drawingDate: Date) => Promise<Array<drawingNumber>>;
export type recordWinningsFunc = (winning: ownerWinning) => Promise<void>;

export async function AddPowerBallDrawing(
        drawingDate: Date,
        number: powerballNumber,
        multiplier: number,
        grandPrizeAmount: number,
        getDrawingNumbersFunc: getDrawingNumbersFunc = getDrawingNumbers,
        recordDrawingFunc: recordDrawingFunc = recordDrawing,
        recordWinningsFunc: recordWinningsFunc = recordWinnings) : Promise<Array<ownerWinning>> {
    const currentDate = new Date();

    const powerballDrawing: powerballDrawing = {
        drawingDate: drawingDate,
        number01: number.number01,
        number02: number.number02,
        number03: number.number03,
        number04: number.number04,
        number05: number.number05,
        powerNumber: number.powerNumber,
        createDate: currentDate,
        updateDate: currentDate
    }
    if (recordDrawingFunc) {
        await recordDrawingFunc(powerballDrawing);
    }

    let ownerWinnings: Array<ownerWinning> = [];
    
    if (getDrawingNumbersFunc) {
        const drawingNumbers = await getDrawingNumbersFunc(drawingDate);
        drawingNumbers.map(async (drawingNumber: drawingNumber) => {
            let matchCount = 0;
            if (getMatch(drawingNumber.number01, number)) {
                matchCount++;
            }
            const winningAmount = getWinningAmount(matchCount,
                drawingNumber.powerNumber === number.powerNumber,
                drawingNumber.powerPlay ? multiplier : 1,
                grandPrizeAmount);

            const ownerWinning: ownerWinning = {
                ticketId: drawingNumber.ticketId,
                drawingDate: drawingDate,
                amount: winningAmount,
                createDate: currentDate,
                updateDate: currentDate
            }
            ownerWinnings.push(ownerWinning);

            if (recordWinningsFunc) {
                await recordWinningsFunc(ownerWinning);
            }
        });
    }
    return ownerWinnings;
}

function getMatch(checkNumber: number, drawingNumber: powerballNumber): boolean {
    return checkNumber === drawingNumber.number01
        || checkNumber === drawingNumber.number02
        || checkNumber === drawingNumber.number03
        || checkNumber === drawingNumber.number04
        || checkNumber === drawingNumber.number05;
}

function getWinningAmount(
    matchCount: number,
    powerNumberMatch: boolean,
    multiplier: number,
    grandPrizeAmount: number): number {
    if (powerNumberMatch) {
        if (matchCount > 4) {
            return grandPrizeAmount;
        } else if (matchCount > 3) {
            return 50000 * multiplier;
        } else if (matchCount > 2) {
            return 100 * multiplier;
        } else if (matchCount > 1) {
            return 7 * multiplier;
        } else {
            return 4 * multiplier;
        }
    } else {
        if (matchCount > 4) {
            return multiplier !== 1 ? 2000000 : 1000000;
        } else if (matchCount > 3) {
            return 100 * multiplier;
        } else if (matchCount > 2) {
            return 7 * multiplier;
        }
    }
    return 0;
}

async function recordDrawing(drawing: powerballDrawing): Promise<void> {
    const client = new Client(postgresConfig);

    try {
        await client.connect();
   
        const powerballDrawingQuery = 'INSERT INTO PowerballDrawing '
            + '(DrawingDate, Number01, Number02, Number03, Number04, Number05, PowerNumber, CreateDate, UpdateDate) '
            + 'VALUES ( '
            + `'${moment(drawing.drawingDate).format(dateFormat)}', `
            + `${drawing.number01}, `
            + `${drawing.number02}, `
            + `${drawing.number03}, `
            + `${drawing.number04}, `
            + `${drawing.number05}, `
            + `${drawing.powerNumber}, `
            + `'${moment(drawing.createDate).format(dateTimeFormat)}', `
            + `'${moment(drawing.updateDate).format(dateTimeFormat)}') `
            + 'ON CONFLICT (drawingDate) DO UPDATE '
            + `SET Number01 = ${drawing.number01}, `
            + ` Number02 = ${drawing.number02}, `
            + ` Number03 = ${drawing.number03}, `
            + ` Number04 = ${drawing.number04}, `
            + ` Number05 = ${drawing.number05}, `
            + ` PowerNumber = ${drawing.powerNumber}, `
            + ` UpdateDate = '${moment(drawing.updateDate).format(dateTimeFormat)}'`;
        await client.query(powerballDrawingQuery);
    } catch (e) {
        console.log('Error encountered while processing data:', e)
    } finally {
        if (!client.closed) {
            await client.end();
        }
    }
}

async function getDrawingNumbers(drawingDate: Date): Promise<Array<drawingNumber>> {
    const client = new Client(postgresConfig);

    let drawingNumbers: Array<drawingNumber> = [];

    try {
        await client.connect();

        // Get all tickets that have a drawing date that matches the drawing date
        const ticketQuery =
              'SELECT n.*, t.PowerPlay '
            + 'FROM PowerballTicketDrawing d '
            + '    INNER JOIN PowerballTicketNumber n ON d.TicketId = n.TicketId '
            + '    INNER JOIN PowerballTicket t ON d.TicketId = t.TicketId '
            + `WHERE d.DrawingDate = '${moment(drawingDate).format(dateFormat)}'`;
        
        const stream = client.query(ticketQuery);
        for await (const dataRow of stream) {
            const number: drawingNumber = {
                ticketId: `${dataRow.get('ticketid')}`,
                number01: Number(dataRow.get('number01')) || 0,
                number02: Number(dataRow.get('number02')) || 0,
                number03: Number(dataRow.get('number03')) || 0,
                number04: Number(dataRow.get('number04')) || 0,
                number05: Number(dataRow.get('number05')) || 0,
                powerNumber: Number(dataRow.get('powernumber')) || 0,
                powerPlay: `${dataRow.get('powerplay')}` === 'true'
            }
            drawingNumbers.push(number);
        }
    } catch (e) {
        console.log('Error encountered while processing data:', e)
    } finally {
        if (!client.closed) {
            await client.end();
        }
    }

    return drawingNumbers;
}

async function recordWinnings(winning: ownerWinning): Promise<void> {
    const client = new Client(postgresConfig);

    try {
        await client.connect();
   
        const ownerWinningQuery = 'INSERT INTO OwnerWinning '
            + '(TicketId, DrawingDate, Amount, CreateDate, UpdateDate) '
            + 'VALUES ( '
            + `'${winning.ticketId}', `
            + `'${moment(winning.drawingDate).format(dateFormat)}', `
            + `${winning.amount}, `
            + `'${moment(winning.createDate).format(dateTimeFormat)}', `
            + `'${moment(winning.updateDate).format(dateTimeFormat)}') `
            + 'ON CONFLICT (TicketId, DrawingDate) DO UPDATE '
            + `SET Amount = ${winning.amount} + COALESCE (Amount, 0), `
            + `    UpdateDate = '${moment(winning.updateDate).format(dateTimeFormat)}'`;
        await client.query(ownerWinningQuery);
    } catch (e) {
        console.log('Error encountered while processing data:', e)
    } finally {
        if (!client.closed) {
            await client.end();
        }
    }
}