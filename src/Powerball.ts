import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { GetPowerballDrawingsSince } from './getPowerballDrawing';

export class Powerball {
  private powerballDrawingRepository: PowerballDrawingRepository;

  constructor(powerballDrawingRepository: PowerballDrawingRepository) {
    this.powerballDrawingRepository = powerballDrawingRepository;
  }

  public async GetWinningsSinceLastDrawing(): Promise<void> {
    const lastPowerballDrawing = await this.powerballDrawingRepository.GetLatest();

    if (lastPowerballDrawing) {
      const powerballDrawings = await GetPowerballDrawingsSince(lastPowerballDrawing.drawingDate);
      for (let powerballDrawing of powerballDrawings) {
        await this.powerballDrawingRepository.Save(powerballDrawing);

        // Get all tickets that have the same drawing date

        // For each ticket, record winnings (or lack thereof)

        // For each drawing, generate a report line for the ticket winnings
      }
    }

    // Return the winnings report
  }
}
