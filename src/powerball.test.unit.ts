import { Powerball } from './Powerball';
import { mock, instance } from 'ts-mockito';
import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { PowerballTicketDrawingRepository } from './repositories/powerball-ticket-drawing';
import { PowerballTicketNumberRepository } from './repositories/powerball-ticket-number';
import { PowerballDrawing } from './interfaces/powerball-drawing';
import { v4 as uuidv4 } from 'uuid';
import { PowerballTicketNumber } from './interfaces/powerball-ticket-number';
import { PowerballTicketRepository } from './repositories/powerball-ticket';
import { PowerballTicket } from './interfaces/powerball-ticket';
import Logger from './helpers/logger';

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
      createPowerballTicketNumber(powerballTicket.ticketId, [1, 2, 3, 4, 5, 6]),
      createPowerballTicketNumber(powerballTicket.ticketId, [2, 3, 4, 5, 6, 7]),
      createPowerballTicketNumber(powerballTicket.ticketId, [3, 4, 5, 6, 7, 8]),
      createPowerballTicketNumber(powerballTicket.ticketId, [4, 5, 6, 7, 8, 9]),
      createPowerballTicketNumber(powerballTicket.ticketId, [5, 6, 7, 8, 9, 10])
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
    powerball.calculateWinning(
      powerballTicket.ticketId,
      powerballTicket.powerPlay,
      powerballDrawing,
      powerballTicketNumbers,
      Powerball.defaultGrandPrize
    );
    //Then TicketWinnings should be
    const expectedWinnings = Powerball.defaultGrandPrize;
    Logger.instance.info(`${expectedWinnings}`);
  });
});
