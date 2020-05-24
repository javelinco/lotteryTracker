import { addPowerBallDrawing } from './add-powerball-drawing';
import { DrawingNumber } from './interfaces/drawing-number';
import { PowerballNumber } from './interfaces/powerball-number';
import { v4 as uuidv4 } from 'uuid';
import { PowerballReport, TicketWinningReport, PowerballReportNumber } from './interfaces/powerball-report';
import Logger from './helpers/logger';

let expectedTicketWinnings: Array<{ ticketId: string; winnings: number; matchCount: number; powerballMatch: boolean }> = [];
let expectedLotteryReturnOnInvestment: number = 0;
let ticketIds: Array<string> = [];
let drawingNumbers: Array<DrawingNumber> = [];
let drawingNumber: PowerballNumber;

async function getDrawingNumbers(drawingDate: Date): Promise<Array<DrawingNumber>> {
  Logger.instance.debug(drawingDate);
  return drawingNumbers;
}

async function getTicketWinnings(ticketId: string): Promise<number> {
  return expectedTicketWinnings.filter(ticket => ticket.ticketId === ticketId)[0].winnings;
}

async function getLotteryReturnOnInvestment(): Promise<number> {
  return expectedLotteryReturnOnInvestment;
}

describe('Add Powerball Drawing', () => {
  beforeAll(() => {
    ticketIds = [uuidv4(), uuidv4(), uuidv4()];

    drawingNumbers = [
      {
        ticketId: ticketIds[0],
        number01: 1,
        number02: 8,
        number03: 9,
        number04: 10,
        number05: 11,
        powerNumber: 6,
        powerPlay: true
      },
      {
        ticketId: ticketIds[1],
        number01: 12,
        number02: 13,
        number03: 14,
        number04: 15,
        number05: 16,
        powerNumber: 17,
        powerPlay: true
      },
      {
        ticketId: ticketIds[2],
        number01: 18,
        number02: 19,
        number03: 20,
        number04: 21,
        number05: 22,
        powerNumber: 23,
        powerPlay: false
      },
      {
        ticketId: ticketIds[0],
        number01: 24,
        number02: 25,
        number03: 26,
        number04: 27,
        number05: 28,
        powerNumber: 29,
        powerPlay: true
      }
    ];
    drawingNumber = {
      number01: 1,
      number02: 2,
      number03: 3,
      number04: 4,
      number05: 5,
      powerNumber: 6
    };
    expectedTicketWinnings = [
      { ticketId: ticketIds[0], winnings: 8, matchCount: 1, powerballMatch: true },
      { ticketId: ticketIds[1], winnings: 0, matchCount: 0, powerballMatch: false },
      { ticketId: ticketIds[2], winnings: 0, matchCount: 0, powerballMatch: false }
    ];
    expectedLotteryReturnOnInvestment = -75 + expectedTicketWinnings.reduce((sum, winning) => sum + winning.winnings, 0);
  });

  it('Should report single win with PowerNumber match only', async () => {
    const drawingDate = new Date('11/16/2019');
    const multiplier = 2;
    const grandPrizeAmount = 100000000;
    const powerballReportItem: PowerballReport = await addPowerBallDrawing(
      drawingDate,
      drawingNumber,
      multiplier,
      grandPrizeAmount,
      getDrawingNumbers,
      getTicketWinnings,
      getLotteryReturnOnInvestment,
      null,
      null
    );

    expect(powerballReportItem).toBeTruthy();
    expect(powerballReportItem.drawingNumber).toBe(drawingNumber);
    expect(powerballReportItem.lotteryReturnOnInvestment).toBe(expectedLotteryReturnOnInvestment);
    expect(powerballReportItem.ticketWinningReports.length).toBe(ticketIds.length);
    ticketIds.map((ticketId: string) => {
      const ticketWinningReports: Array<TicketWinningReport> = powerballReportItem.ticketWinningReports.filter(
        report => report.ticketId === ticketId
      );
      const expectedTicketWinning = expectedTicketWinnings.filter(ticket => ticket.ticketId === ticketId)[0];
      expect(ticketWinningReports.length).toBe(1);
      expect(ticketWinningReports[0].drawingWinningAmount).toBe(expectedTicketWinning.winnings);
      expect(ticketWinningReports[0].numbers.length).toBe(drawingNumbers.filter(number => number.ticketId == ticketId).length);
      ticketWinningReports[0].numbers.map((number: PowerballReportNumber) => {
        if (number.number01 === 24) {
          expect(number.matchCount).toBe(0);
          expect(number.powerballMatch).toBe(false);
        } else {
          expect(number.matchCount).toBe(expectedTicketWinning.matchCount);
          expect(number.powerballMatch).toBe(expectedTicketWinning.powerballMatch);
        }
      });
    });
  });
});