import { AddPowerBallDrawing } from './addPowerBallDrawing';
// import { drawingNumber } from './interfaces/drawingNumber';
import { powerballNumber } from './interfaces/powerballNumber';
import Logger from './helpers/logger';
// import { v4 as uuid } from 'uuid';
// import { powerballReport, ticketWinningReport, powerballReportNumber } from './interfaces/powerballReport';

// let expectedTicketWinnings: Array<{ ticketId: string; winnings: number; matchCount: number; powerballMatch: boolean }> = [];
// let expectedLotteryReturnOnInvestment: number = 0;
// let ticketIds: Array<string> = [];
// let drawingNumbers: Array<drawingNumber> = [];
// let drawingNumber: powerballNumber;

interface powerballDrawingEntry {
  drawingDate: Date;
  drawingNumber: powerballNumber;
  multiplier: number;
  grandPrizeAmount: number;
}

// async function getDrawingNumbers(drawingDate: Date): Promise<Array<drawingNumber>> {
//   console.trace(drawingDate);
//   return drawingNumbers;
// }

// async function getTicketWinnings(ticketId: string): Promise<number> {
//   return expectedTicketWinnings.filter(ticket => ticket.ticketId === ticketId)[0].winnings;
// }

// async function getLotteryReturnOnInvestment(): Promise<number> {
//   return expectedLotteryReturnOnInvestment;
// }

const powerballDrawings: Array<powerballDrawingEntry> = [
  {
    drawingDate: new Date('4/22/2020'),
    drawingNumber: {
      number01: 1,
      number02: 33,
      number03: 35,
      number04: 40,
      number05: 69,
      powerNumber: 24
    },
    multiplier: 5,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('4/25/2020'),
    drawingNumber: {
      number01: 1,
      number02: 3,
      number03: 21,
      number04: 47,
      number05: 57,
      powerNumber: 18
    },
    multiplier: 2,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('4/29/2020'),
    drawingNumber: {
      number01: 2,
      number02: 20,
      number03: 49,
      number04: 61,
      number05: 67,
      powerNumber: 20
    },
    multiplier: 2,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('5/2/2020'),
    drawingNumber: {
      number01: 13,
      number02: 16,
      number03: 33,
      number04: 58,
      number05: 68,
      powerNumber: 24
    },
    multiplier: 5,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('5/6/2020'),
    drawingNumber: {
      number01: 7,
      number02: 8,
      number03: 35,
      number04: 50,
      number05: 65,
      powerNumber: 20
    },
    multiplier: 4,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('5/9/2020'),
    drawingNumber: {
      number01: 12,
      number02: 18,
      number03: 42,
      number04: 48,
      number05: 65,
      powerNumber: 19
    },
    multiplier: 5,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('5/13/2020'),
    drawingNumber: {
      number01: 39,
      number02: 53,
      number03: 54,
      number04: 56,
      number05: 57,
      powerNumber: 20
    },
    multiplier: 3,
    grandPrizeAmount: 0
  },
  {
    drawingDate: new Date('5/16/2020'),
    drawingNumber: {
      number01: 8,
      number02: 12,
      number03: 26,
      number04: 39,
      number05: 42,
      powerNumber: 11
    },
    multiplier: 2,
    grandPrizeAmount: 0
  }
];

describe('Add Powerball Drawing', () => {
  // beforeAll(() => {
  //   ticketIds = [uuid(), uuid(), uuid()];

  //   drawingNumbers = [
  //     {
  //       ticketId: ticketIds[0],
  //       number01: 1,
  //       number02: 8,
  //       number03: 9,
  //       number04: 10,
  //       number05: 11,
  //       powerNumber: 6,
  //       powerPlay: true
  //     },
  //     {
  //       ticketId: ticketIds[1],
  //       number01: 12,
  //       number02: 13,
  //       number03: 14,
  //       number04: 15,
  //       number05: 16,
  //       powerNumber: 17,
  //       powerPlay: true
  //     },
  //     {
  //       ticketId: ticketIds[2],
  //       number01: 18,
  //       number02: 19,
  //       number03: 20,
  //       number04: 21,
  //       number05: 22,
  //       powerNumber: 23,
  //       powerPlay: false
  //     },
  //     {
  //       ticketId: ticketIds[0],
  //       number01: 24,
  //       number02: 25,
  //       number03: 26,
  //       number04: 27,
  //       number05: 28,
  //       powerNumber: 29,
  //       powerPlay: true
  //     }
  //   ];
  //   drawingNumber = {
  //     number01: 1,
  //     number02: 2,
  //     number03: 3,
  //     number04: 4,
  //     number05: 5,
  //     powerNumber: 6
  //   };
  //   expectedTicketWinnings = [
  //     { ticketId: ticketIds[0], winnings: 8, matchCount: 1, powerballMatch: true },
  //     { ticketId: ticketIds[1], winnings: 0, matchCount: 0, powerballMatch: false },
  //     { ticketId: ticketIds[2], winnings: 0, matchCount: 0, powerballMatch: false }
  //   ];
  //   expectedLotteryReturnOnInvestment = -75 + expectedTicketWinnings.reduce((sum, winning) => sum + winning.winnings, 0);
  // });

  it('Should record all powerball drawings', async () => {
    for (let powerballDrawingEntry of powerballDrawings) {
      Logger.instance.info(
        await AddPowerBallDrawing(
          powerballDrawingEntry.drawingDate,
          powerballDrawingEntry.drawingNumber,
          powerballDrawingEntry.multiplier,
          powerballDrawingEntry.grandPrizeAmount
        )
      );
    }
  }, 60000);

  // it('Should report single win with PowerNumber match only', async () => {
  //   const drawingDate = new Date('11/16/2019');
  //   const multiplier = 2;
  //   const grandPrizeAmount = 100000000;
  //   const powerballReport: powerballReport = await AddPowerBallDrawing(
  //     drawingDate,
  //     drawingNumber,
  //     multiplier,
  //     grandPrizeAmount,
  //     getDrawingNumbers,
  //     getTicketWinnings,
  //     getLotteryReturnOnInvestment,
  //     null,
  //     null
  //   );

  //   expect(powerballReport).toBeTruthy();
  //   expect(powerballReport.drawingNumber).toBe(drawingNumber);
  //   expect(powerballReport.lotteryReturnOnInvestment).toBe(expectedLotteryReturnOnInvestment);
  //   expect(powerballReport.ticketWinningReports.length).toBe(ticketIds.length);
  //   ticketIds.map((ticketId: string) => {
  //     const ticketWinningReports: Array<ticketWinningReport> = powerballReport.ticketWinningReports.filter(
  //       report => report.ticketId === ticketId
  //     );
  //     const expectedTicketWinning = expectedTicketWinnings.filter(ticket => ticket.ticketId === ticketId)[0];
  //     expect(ticketWinningReports.length).toBe(1);
  //     expect(ticketWinningReports[0].drawingWinningAmount).toBe(expectedTicketWinning.winnings);
  //     expect(ticketWinningReports[0].numbers.length).toBe(drawingNumbers.filter(number => number.ticketId == ticketId).length);
  //     ticketWinningReports[0].numbers.map((number: powerballReportNumber) => {
  //       if (number.number01 === 24) {
  //         expect(number.matchCount).toBe(0);
  //         expect(number.powerballMatch).toBe(false);
  //       } else {
  //         expect(number.matchCount).toBe(expectedTicketWinning.matchCount);
  //         expect(number.powerballMatch).toBe(expectedTicketWinning.powerballMatch);
  //       }
  //     });
  //   });
  // });
});
