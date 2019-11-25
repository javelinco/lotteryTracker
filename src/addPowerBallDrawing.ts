import { powerballNumber } from './interfaces/powerballNumber';
import { ownerWinning } from './interfaces/ownerWinning';
import { Client } from 'ts-postgres';
import { postgresConfig } from './configuration/postgressConfig';
import * as moment from 'moment';
import { powerballDrawing } from './interfaces/powerballDrawing';
import { drawingNumber } from './interfaces/drawingNumber';
import { dateTimeFormat, dateFormat } from './helpers/dateFormat';
import { powerballReport, powerballReportNumber, ticketWinningReport } from './interfaces/powerballReport';

export type recordDrawingFunc = (drawing: powerballDrawing) => Promise<void>;
export type getDrawingNumbersFunc = (drawingDate: Date) => Promise<Array<drawingNumber>>;
export type recordWinningsFunc = (winning: ownerWinning) => Promise<void>;
export type getTicketWinningsFunc = (ticketId: string) => Promise<number>;
export type getLotteryReturnOnInvestmentFunc = () => Promise<number>;

export async function AddPowerBallDrawing(
        drawingDate: Date,
        drawingNumber: powerballNumber,
        multiplier: number,
        grandPrizeAmount: number,
        getDrawingNumbersFunc: getDrawingNumbersFunc | null = getDrawingNumbers,
        getTicketWinningsFunc: getTicketWinningsFunc | null = getTicketWinnings,
        getLotteryReturnOnInvestmentFunc: getLotteryReturnOnInvestmentFunc | null = getLotteryReturnOnInvestment,
        recordDrawingFunc: recordDrawingFunc | null = recordDrawing,
        recordWinningsFunc: recordWinningsFunc | null = recordWinnings) : Promise<powerballReport> {
    const currentDate = new Date();

    const powerballDrawing: powerballDrawing = {
        drawingDate: drawingDate,
        number01: drawingNumber.number01,
        number02: drawingNumber.number02,
        number03: drawingNumber.number03,
        number04: drawingNumber.number04,
        number05: drawingNumber.number05,
        powerNumber: drawingNumber.powerNumber,
        createDate: currentDate,
        updateDate: currentDate
    }
    if (recordDrawingFunc) {
        await recordDrawingFunc(powerballDrawing);
    }

    let powerballReport: powerballReport = {
        drawingNumber: drawingNumber,
        ticketWinningReports: [],
        lotteryReturnOnInvestment: 0
    };
    
    if (getDrawingNumbersFunc) {
        const drawingNumbers = await getDrawingNumbersFunc(drawingDate);
        Array.from(new Set(drawingNumbers.map((ticketNumber: drawingNumber) => ticketNumber.ticketId)))
            .map(async (currentTicketId: string) => {
                let ticketWinningReport: ticketWinningReport = {
                    ticketId: currentTicketId,
                    numbers: [],
                    drawingWinningAmount: 0,
                    ticketWinningAmount: 0
                }
                drawingNumbers.filter((ticketNumber: drawingNumber) => ticketNumber.ticketId === currentTicketId)
                    .map(async (ticketNumber: drawingNumber) => {
                        const matchCount: number = getMatchCount(ticketNumber, drawingNumber);
                        const powerballMatch: boolean = ticketNumber.powerNumber === drawingNumber.powerNumber;
                        const winningAmount: number = getWinningAmount(matchCount,
                            powerballMatch,
                            ticketNumber.powerPlay ? multiplier : 1,
                            grandPrizeAmount);
            
                        const ownerWinning: ownerWinning = {
                            ticketId: ticketNumber.ticketId,
                            drawingDate: drawingDate,
                            amount: winningAmount,
                            createDate: currentDate,
                            updateDate: currentDate
                        }
                        
                        const powerballReportNumber: powerballReportNumber = {
                            ...ticketNumber,
                            matchCount: matchCount,
                            powerballMatch: powerballMatch
                        };
                        ticketWinningReport.numbers.push(powerballReportNumber);
                        ticketWinningReport.drawingWinningAmount += winningAmount;
            
                        if (recordWinningsFunc) {
                            await recordWinningsFunc(ownerWinning);
                        }
                    });
                if (getTicketWinningsFunc) {
                    ticketWinningReport.ticketWinningAmount = await getTicketWinningsFunc(currentTicketId);
                }
                powerballReport.ticketWinningReports.push(ticketWinningReport);
            });
    }
    if (getLotteryReturnOnInvestmentFunc) {
        powerballReport.lotteryReturnOnInvestment = await getLotteryReturnOnInvestmentFunc();
    }
    return powerballReport;
}

async function getTicketWinnings(ticketId: string): Promise<number> {
    const client = new Client(postgresConfig);

    let ticketWinningAmount: number = 0;

    try {
        await client.connect();

        // Get all tickets that have a drawing date that matches the drawing date
        const ticketQuery =
              'SELECT '
            + ' SUM(amount) TicketWinningAmount '
            + 'FROM OwnerWinning '
            + `WHERE TicketId = '${ticketId}'`;
        
        const stream = client.query(ticketQuery);
        for await (const dataRow of stream) {
            ticketWinningAmount += Number(dataRow.get('TicketWinningAmount')) || 0;
        }
    } catch (e) {
        console.log('Error encountered while processing data:', e)
    } finally {
        if (!client.closed) {
            await client.end();
        }
    }

    return ticketWinningAmount;
}

async function getLotteryReturnOnInvestment(): Promise<number> {
    const client = new Client(postgresConfig);

    let lotteryReturnOnInvestment: number = 0;

    try {
        await client.connect();

        // Get all tickets that have a drawing date that matches the drawing date
        const ticketQuery =
              'SELECT '
            + ' SUM(COALESCE(amount, 0)) - SUM(COALESCE(cost, 0))) LotteryReturnOnInvestment '
            + 'FROM PowerballTicket pt '
            + ' LEFT JOIN OwnerWinning ow ON pt.TicketId = ow.TicketId '
        
        const stream = client.query(ticketQuery);
        for await (const dataRow of stream) {
            lotteryReturnOnInvestment += Number(dataRow.get('LotteryReturnOnInvestment')) || 0;
        }
    } catch (e) {
        console.log('Error encountered while processing data:', e)
    } finally {
        if (!client.closed) {
            await client.end();
        }
    }

    return lotteryReturnOnInvestment;
}

function getMatchCount(ticketNumber: drawingNumber, drawingNumber: powerballNumber): number {
    let matchCount = 0;
    if (getMatch(drawingNumber.number01, ticketNumber)) {
        matchCount++;
    }
    if (getMatch(drawingNumber.number02, ticketNumber)) {
        matchCount++;
    }
    if (getMatch(drawingNumber.number03, ticketNumber)) {
        matchCount++;
    }
    if (getMatch(drawingNumber.number04, ticketNumber)) {
        matchCount++;
    }
    if (getMatch(drawingNumber.number05, ticketNumber)) {
        matchCount++;
    }
    return matchCount;
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
              'SELECT DISTINCT n.*, t.PowerPlay '
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