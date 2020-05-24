import { Powerball, TicketWinning, TicketNumberWinning } from './Powerball';
import { mock, instance } from 'ts-mockito';
import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { PowerballTicketDrawingRepository } from './repositories/powerball-ticket-drawing';
import { PowerballTicketNumberRepository } from './repositories/powerball-ticket-number';
import { PowerballDrawing } from './interfaces/powerball-drawing';
import { v4 as uuidv4 } from 'uuid';
import { PowerballTicketNumber } from './interfaces/powerball-ticket-number';
import { PowerballTicketRepository } from './repositories/powerball-ticket';
import { PowerballTicket } from './interfaces/powerball-ticket';

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

  it('Should calculate Powerball winnings for a ticket', async () => {
    const powerballDrawingRepositoryMock = mock(PowerballDrawingRepository);
    const powerballTicketDrawingRepositoryMock = mock(PowerballTicketDrawingRepository);
    const powerballTicketNumberRepositoryMock = mock(PowerballTicketNumberRepository);
    const powerballTicketRepositoryMock = mock(PowerballTicketRepository);

    const powerball = new Powerball(
      instance(powerballDrawingRepositoryMock),
      instance(powerballTicketDrawingRepositoryMock),
      instance(powerballTicketNumberRepositoryMock),
      instance(powerballTicketRepositoryMock)
    );
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
});
