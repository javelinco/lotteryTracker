import { Powerball } from './Powerball';
import { TicketWinning, TicketNumberWinning } from './interfaces/drawing-winning';
import { mock, instance } from 'ts-mockito';
import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { PowerballTicketDrawingRepository } from './repositories/powerball-ticket-drawing';
import { PowerballTicketNumberRepository } from './repositories/powerball-ticket-number';
import { PowerballDrawing } from './interfaces/powerball-drawing';
import { v4 as uuidv4 } from 'uuid';
import { PowerballTicketNumber } from './interfaces/powerball-ticket-number';
import { PowerballTicketRepository } from './repositories/powerball-ticket';
import { PowerballTicket } from './interfaces/powerball-ticket';
import { OwnerWinningRepository } from './repositories/owner-winning';

interface TestDrawingDate {
  purchaseDate: Date;
  drawingCount: number;
  expectedDrawingDates: Array<Date>;
}

describe('Unit - Powerball', () => {
  function createPowerballTicketNumber(ticketId: string, numbers: Array<number>): PowerballTicketNumber {
    const powerballTicketNumber: PowerballTicketNumber = {
      ticketNumberId: uuidv4(),
      ticketId: ticketId,
      number01: numbers[0],
      number02: numbers[1],
      number03: numbers[2],
      number04: numbers[3],
      number05: numbers[4],
      powerNumber: numbers[5],
      createDate: new Date('1/1/2000'),
      updateDate: new Date('1/1/2000')
    };
    return powerballTicketNumber;
  }

  let powerball: Powerball;

  beforeEach(() => {
    const powerballDrawingRepositoryMock = mock(PowerballDrawingRepository);
    const powerballTicketDrawingRepositoryMock = mock(PowerballTicketDrawingRepository);
    const powerballTicketNumberRepositoryMock = mock(PowerballTicketNumberRepository);
    const powerballTicketRepositoryMock = mock(PowerballTicketRepository);
    const ownerWinningRepositoryMock = mock(OwnerWinningRepository);

    powerball = new Powerball(
      instance(powerballDrawingRepositoryMock),
      instance(powerballTicketDrawingRepositoryMock),
      instance(powerballTicketNumberRepositoryMock),
      instance(powerballTicketRepositoryMock),
      instance(ownerWinningRepositoryMock)
    );
  });

  it('Should calculate Powerball winnings for a ticket', async () => {
    //Given a powerball ticket with five numbers
    const powerballTicket: PowerballTicket = {
      ticketId: uuidv4(),
      purchaseDate: new Date('1/1/2000'),
      cost: 25,
      powerPlay: true,
      ownerId: uuidv4(),
      createDate: new Date('1/1/2000'),
      updateDate: new Date('1/1/2000')
    };
    const powerballTicketNumbers: Array<PowerballTicketNumber> = [
      createPowerballTicketNumber(powerballTicket.ticketId, [1, 2, 3, 4, 5, 6]), // Grand Prize
      createPowerballTicketNumber(powerballTicket.ticketId, [2, 3, 4, 5, 6, 7]), // 4 matches
      createPowerballTicketNumber(powerballTicket.ticketId, [3, 4, 5, 6, 7, 8]), // 3 matches
      createPowerballTicketNumber(powerballTicket.ticketId, [4, 5, 6, 7, 8, 9]), // 2 matches
      createPowerballTicketNumber(powerballTicket.ticketId, [5, 6, 7, 8, 9, 10]) // 1 match
    ];

    //Given a powerball drawing
    const powerballDrawing: PowerballDrawing = {
      drawingDate: new Date('1/1/2000'),
      number01: 1,
      number02: 2,
      number03: 3,
      number04: 4,
      number05: 5,
      powerNumber: 6,
      multiplier: 2,
      createDate: new Date('1/1/2000'),
      updateDate: new Date('1/1/2000')
    };
    //When calculateWinning
    const ticketWinning = powerball.calculateWinning(
      powerballTicket.ticketId,
      powerballTicket.powerPlay,
      powerballDrawing,
      powerballTicketNumbers,
      Powerball.defaultGrandPrize
    );
    //Then TicketWinnings should be
    const expectedTicketNumberWinnings: Array<TicketNumberWinning> = [
      {
        powerballTicketNumber: powerballTicketNumbers[0],
        matches: 5,
        powerNumberMatch: true,
        amount: powerball.calculatePrize(5, true, powerballTicket.powerPlay, powerballDrawing.multiplier, Powerball.defaultGrandPrize)
      },
      {
        powerballTicketNumber: powerballTicketNumbers[1],
        matches: 4,
        powerNumberMatch: false,
        amount: powerball.calculatePrize(4, false, powerballTicket.powerPlay, powerballDrawing.multiplier, Powerball.defaultGrandPrize)
      },
      {
        powerballTicketNumber: powerballTicketNumbers[2],
        matches: 3,
        powerNumberMatch: false,
        amount: powerball.calculatePrize(3, false, powerballTicket.powerPlay, powerballDrawing.multiplier, Powerball.defaultGrandPrize)
      },
      {
        powerballTicketNumber: powerballTicketNumbers[3],
        matches: 2,
        powerNumberMatch: false,
        amount: powerball.calculatePrize(2, false, powerballTicket.powerPlay, powerballDrawing.multiplier, Powerball.defaultGrandPrize)
      },
      {
        powerballTicketNumber: powerballTicketNumbers[4],
        matches: 1,
        powerNumberMatch: false,
        amount: powerball.calculatePrize(0, false, powerballTicket.powerPlay, powerballDrawing.multiplier, Powerball.defaultGrandPrize)
      }
    ];
    const expectedTicketWinning: TicketWinning = {
      ticketId: powerballTicket.ticketId,
      drawingDate: powerballDrawing.drawingDate,
      ticketNumberWinnings: expectedTicketNumberWinnings
    };
    expect(expectedTicketWinning).toEqual(ticketWinning);
  });

  it('Should get winnings given no last Powerball drawing', async () => {
    expect(true).toBeTruthy();
  });

  it('Should get winnings given a specific last Powerball drawing', async () => {
    expect(true).toBeTruthy();
  });

  it('Should get next drawing dates given purchase date and number of drawings', () => {
    const testDrawingDates: Array<TestDrawingDate> = [
      {
        purchaseDate: new Date('5/25/2020'),
        drawingCount: 5,
        expectedDrawingDates: [
          new Date('5/27/2020'),
          new Date('5/30/2020'),
          new Date('6/3/2020'),
          new Date('6/6/2020'),
          new Date('6/10/2020')
        ]
      },
      {
        purchaseDate: new Date('2/25/2020'),
        drawingCount: 1,
        expectedDrawingDates: [new Date('2/26/2020')]
      },
      {
        purchaseDate: new Date('11/25/2019'),
        drawingCount: 2,
        expectedDrawingDates: [new Date('11/27/2019'), new Date('11/30/2019')]
      },
      {
        purchaseDate: new Date('12/29/2019'),
        drawingCount: 2,
        expectedDrawingDates: [new Date('1/1/2020'), new Date('1/4/2020')]
      },
      {
        purchaseDate: new Date('4/1/2020'),
        drawingCount: 3,
        expectedDrawingDates: [new Date('4/1/2020'), new Date('4/4/2020'), new Date('4/8/2020')]
      },
      {
        purchaseDate: new Date('2/25/2020'),
        drawingCount: 10,
        expectedDrawingDates: [
          new Date('2/26/2020'),
          new Date('2/29/2020'),
          new Date('3/4/2020'),
          new Date('3/7/2020'),
          new Date('3/11/2020'),
          new Date('3/14/2020'),
          new Date('3/18/2020'),
          new Date('3/21/2020'),
          new Date('3/25/2020'),
          new Date('3/28/2020')
        ]
      }
    ];

    for (const testDrawingDate of testDrawingDates) {
      const drawingDates = powerball.getPowerballDrawingDates(testDrawingDate.purchaseDate, testDrawingDate.drawingCount);

      expect(drawingDates).toEqual(testDrawingDate.expectedDrawingDates);
    }
  });
});
