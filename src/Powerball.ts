import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { getPowerballDrawingsSince } from './get-powerball-drawing';

export class Powerball {
  private powerballDrawingRepository: PowerballDrawingRepository;

  public constructor(powerballDrawingRepository: PowerballDrawingRepository) {
    this.powerballDrawingRepository = powerballDrawingRepository;
  }

  public async getWinningsSinceLastDrawing(): Promise<void> {
    const lastPowerballDrawing = await this.powerballDrawingRepository.getLatest();

    if (lastPowerballDrawing) {
      const powerballDrawings = await getPowerballDrawingsSince(lastPowerballDrawing.drawingDate);
      for (const powerballDrawing of powerballDrawings) {
        await this.powerballDrawingRepository.save(powerballDrawing);

        // Get all tickets that have the same drawing date

        // For each ticket, record winnings (or lack thereof)

        // For each drawing, generate a report line for the ticket winnings
      }
    }

    // Return the winnings report
  }
}
