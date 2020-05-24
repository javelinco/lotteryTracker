import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { getPowerballDrawingsSince } from './get-powerball-drawing';
import { PowerballTicketDrawingRepository } from './repositories/powerball-ticket-drawing';
import { PowerballTicketNumber } from './interfaces/powerball-ticket-number';
import { PowerballTicketNumberRepository } from './repositories/powerball-ticket-number';
import Logger from './helpers/logger';
import { PowerballDrawing } from './interfaces/powerball-drawing';
import { PowerballTicketRepository } from './repositories/powerball-ticket';

export interface TicketWinning {
  ticketId: string;
  drawingDate: Date;
  matches: number;
  powerNumberMatch: boolean;
  amount: number;
}

export class Powerball {
  private powerballDrawingRepository: PowerballDrawingRepository;
  private powerballTicketDrawingRepository: PowerballTicketDrawingRepository;
  private powerballTicketNumberRepository: PowerballTicketNumberRepository;
  private powerballTicketRepository: PowerballTicketRepository;

  public static defaultGrandPrize: number = 1000000000;

  public constructor(
    powerballDrawingRepository: PowerballDrawingRepository,
    powerballTicketDrawingRepository: PowerballTicketDrawingRepository,
    powerballTicketNumberRepository: PowerballTicketNumberRepository,
    powerballTicketRepository: PowerballTicketRepository
  ) {
    this.powerballDrawingRepository = powerballDrawingRepository;
    this.powerballTicketDrawingRepository = powerballTicketDrawingRepository;
    this.powerballTicketNumberRepository = powerballTicketNumberRepository;
    this.powerballTicketRepository = powerballTicketRepository;
  }

  public async getWinningsSinceLastDrawing(): Promise<void> {
    const lastPowerballDrawing = await this.powerballDrawingRepository.getLatest();

    if (lastPowerballDrawing) {
      const powerballDrawings = await getPowerballDrawingsSince(lastPowerballDrawing.drawingDate);
      for (const powerballDrawing of powerballDrawings) {
        await this.powerballDrawingRepository.save(powerballDrawing);

        // Get all tickets that have the same drawing date
        const ticketIds = (await this.powerballTicketDrawingRepository.getByDrawingDate(powerballDrawing.drawingDate)).map(x => x.ticketId);

        // For each ticket, record winnings (or lack thereof)
        const ticketWinnings: Array<TicketWinning> = [];
        for (const ticketId of ticketIds) {
          const powerballTicket = await this.powerballTicketRepository.load(ticketId);
          const powerballTicketNumbers = await this.powerballTicketNumberRepository.load(ticketId);
          ticketWinnings.push(
            this.calculateWinning(
              ticketId,
              powerballTicket!.powerPlay,
              powerballDrawing,
              powerballTicketNumbers,
              Powerball.defaultGrandPrize
            )
          );
        }

        // For each drawing, generate a report line for the ticket winnings
      }
    }

    // Return the winnings report
  }

  public calculateWinning(
    ticketId: string,
    powerplay: boolean,
    powerballDrawing: PowerballDrawing,
    powerballTicketNumbers: Array<PowerballTicketNumber>,
    grandPrize: number
  ): TicketWinning {
    Logger.instance.info(powerballTicketNumbers);
    Logger.instance.info(`${grandPrize},${powerplay}`);
    return {
      ticketId: ticketId,
      drawingDate: powerballDrawing.drawingDate,
      matches: 0,
      powerNumberMatch: false,
      amount: 0
    };
  }
}
