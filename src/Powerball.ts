import { PowerballDrawingRepository } from './repositories/powerball-drawing';
import { PowerballTicketDrawingRepository } from './repositories/powerball-ticket-drawing';
import { PowerballTicketNumber } from './interfaces/powerball-ticket-number';
import { PowerballTicketNumberRepository } from './repositories/powerball-ticket-number';
import Logger from './helpers/logger';
import { PowerballDrawing } from './interfaces/powerball-drawing';
import { PowerballTicketRepository } from './repositories/powerball-ticket';
import axios from 'axios';
import * as moment from 'moment';
import { dateFormat } from './helpers/date-format';
import { OwnerWinningRepository } from './repositories/owner-winning';
import { PowerballTicketReport } from './interfaces/powerball-ticket-report';
import { PowerballTicket } from './interfaces/powerball-ticket';
import { PowerballTicketPurchase } from './interfaces/powerball-ticket-purchase';

export interface DrawingWinning {
  drawingDate: Date;
  ticketWinnings: Array<TicketWinning>;
}

export interface TicketWinning {
  ticketId: string;
  drawingDate: Date;
  ticketNumberWinnings: Array<TicketNumberWinning>;
}

export interface TicketNumberWinning {
  powerballTicketNumber: PowerballTicketNumber;
  matches: number;
  powerNumberMatch: boolean;
  amount: number;
}

export interface PowerballDrawingEntry {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  field_winning_numbers: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  field_multiplier: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  field_draw_date: Date;
}

export class Powerball {
  private powerballUrl = 'https://powerball.com/api/v1/numbers/powerball?_format=json';
  private powerballDrawingRepository: PowerballDrawingRepository;
  private powerballTicketDrawingRepository: PowerballTicketDrawingRepository;
  private powerballTicketNumberRepository: PowerballTicketNumberRepository;
  private powerballTicketRepository: PowerballTicketRepository;
  private ownerWinningRepository: OwnerWinningRepository;

  public static defaultGrandPrize: number = 1000000000;

  public constructor(
    powerballDrawingRepository: PowerballDrawingRepository = new PowerballDrawingRepository(),
    powerballTicketDrawingRepository: PowerballTicketDrawingRepository = new PowerballTicketDrawingRepository(),
    powerballTicketNumberRepository: PowerballTicketNumberRepository = new PowerballTicketNumberRepository(),
    powerballTicketRepository: PowerballTicketRepository = new PowerballTicketRepository(),
    ownerWinningRepository: OwnerWinningRepository = new OwnerWinningRepository()
  ) {
    this.powerballDrawingRepository = powerballDrawingRepository;
    this.powerballTicketDrawingRepository = powerballTicketDrawingRepository;
    this.powerballTicketNumberRepository = powerballTicketNumberRepository;
    this.powerballTicketRepository = powerballTicketRepository;
    this.ownerWinningRepository = ownerWinningRepository;
  }

  public async addTicket(ticket: PowerballTicket): Promise<PowerballTicketPurchase> {
    const purchase: PowerballTicketPurchase = {
      ticket: ticket,
      numbers: [],
      drawings: []
    };

    // Save ticket

    // Save numbers

    // Save drawings

    // Check for owner winnings

    return purchase;
  }

  public async getPowerballReportsByDrawingDate(drawingDate: Date): Promise<Array<PowerballTicketReport>> {
    const powerballTicketReports: Array<PowerballTicketReport> = [];

    // Get all matching PowerballTicketDrawing records
    const powerballTicketDrawings = await this.powerballTicketDrawingRepository.getByDrawingDate(drawingDate);
    for (const ticketId of powerballTicketDrawings.map(x => x.ticketId)) {
      const powerballTicket = await this.powerballTicketRepository.load(ticketId);
      const powerballTicketReport: PowerballTicketReport = {
        ticket: powerballTicket!,
        numbers: await this.powerballTicketNumberRepository.load(ticketId),
        drawings: await this.powerballTicketDrawingRepository.getAllForTicket(ticketId),
        winnings: await this.ownerWinningRepository.getAllForTicket(ticketId)
      };

      powerballTicketReports.push(powerballTicketReport);
    }

    return powerballTicketReports;
  }

  public async getWinningsSinceLastDrawing(): Promise<Array<DrawingWinning>> {
    let lastPowerballDrawing = await this.powerballDrawingRepository.getLatest();

    if (!lastPowerballDrawing) {
      lastPowerballDrawing = {
        drawingDate: new Date('1/1/2018'),
        number01: 0,
        number02: 0,
        number03: 0,
        number04: 0,
        number05: 0,
        powerNumber: 0,
        multiplier: 0,
        createDate: new Date(),
        updateDate: new Date()
      };
    }
    const powerballDrawings = await this.getPowerballDrawingsSince(lastPowerballDrawing.drawingDate);
    const drawingWinnings: Array<DrawingWinning> = [];
    for (const powerballDrawing of powerballDrawings) {
      await this.powerballDrawingRepository.save(powerballDrawing);

      // Get all tickets that have the same drawing date
      const ticketIds = (await this.powerballTicketDrawingRepository.getByDrawingDate(powerballDrawing.drawingDate)).map(x => x.ticketId);

      // For each ticket, record winnings (or lack thereof)
      const ticketWinnings: Array<TicketWinning> = [];
      for (const ticketId of ticketIds) {
        const powerballTicket = await this.powerballTicketRepository.load(ticketId);
        const powerballTicketNumbers = await this.powerballTicketNumberRepository.load(ticketId);
        const calculatedWinning = this.calculateWinning(
          ticketId,
          powerballTicket!.powerPlay,
          powerballDrawing,
          powerballTicketNumbers,
          Powerball.defaultGrandPrize
        );
        ticketWinnings.push(calculatedWinning);

        const totalAmount = calculatedWinning.ticketNumberWinnings.reduce(function(a, b) {
          return a + (b.amount || 0);
        }, 0);

        await this.ownerWinningRepository.save({
          ticketId: ticketId,
          drawingDate: powerballDrawing.drawingDate,
          amount: totalAmount,
          createDate: new Date(),
          updateDate: new Date()
        });
      }

      // For each drawing, generate a report line for the ticket winnings
      drawingWinnings.push({
        drawingDate: powerballDrawing.drawingDate,
        ticketWinnings: ticketWinnings
      });
    }

    // Return the winnings report
    return drawingWinnings;
  }

  public calculateWinning(
    ticketId: string,
    powerplay: boolean,
    powerballDrawing: PowerballDrawing,
    powerballTicketNumbers: Array<PowerballTicketNumber>,
    grandPrize: number
  ): TicketWinning {
    const ticketNumberWinnings: Array<TicketNumberWinning> = [];
    for (const powerballTicketNumber of powerballTicketNumbers) {
      const ticketNumberWinning = {
        powerballTicketNumber: powerballTicketNumber,
        matches: this.getMatchCountForTicketNumber(powerballTicketNumber, powerballDrawing),
        powerNumberMatch: powerballTicketNumber.powerNumber === powerballDrawing.powerNumber,
        amount: 0
      };
      ticketNumberWinning.amount = this.calculatePrize(
        ticketNumberWinning.matches,
        ticketNumberWinning.powerNumberMatch,
        powerplay,
        powerballDrawing.multiplier,
        grandPrize
      );
      ticketNumberWinnings.push(ticketNumberWinning);
    }
    return {
      ticketId: ticketId,
      drawingDate: powerballDrawing.drawingDate,
      ticketNumberWinnings: ticketNumberWinnings
    };
  }

  public calculatePrize(matches: number, powerNumberMatch: boolean, powerPlay: boolean, multiplier: number, grandPrize: number): number {
    let baseAmount = 0;
    switch (matches) {
      case 0:
        if (powerNumberMatch) {
          baseAmount = 4;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        }
        break;
      case 1:
        if (powerNumberMatch) {
          baseAmount = 4;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        }
        break;
      case 2:
        if (powerNumberMatch) {
          baseAmount = 7;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        }
        break;
      case 3:
        if (powerNumberMatch) {
          baseAmount = 100;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        } else {
          baseAmount = 7;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        }
      case 4:
        if (powerNumberMatch) {
          baseAmount = 50000;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        } else {
          baseAmount = 100;
          return powerPlay ? baseAmount * multiplier : baseAmount;
        }
      case 5:
        if (powerNumberMatch) {
          return powerPlay ? 2000000 : 1000000;
        } else {
          return grandPrize;
        }
    }
    return 0;
  }

  public async getPowerballDrawingsSince(beginDate: Date): Promise<Array<PowerballDrawing>> {
    const url = `${this.powerballUrl}&min=${moment(beginDate)
      .add(1, 'd')
      .format(dateFormat)}%2000:00:00&max=${moment().format(dateFormat)}%2023:59:59`;
    axios.defaults.adapter = require('axios/lib/adapters/http');
    try {
      return this.convert((await axios.get(url)).data);
    } catch (error) {
      Logger.instance.error(error);
      throw error;
    }
  }

  private getMatchCountForTicketNumber(powerballTicketNumber: PowerballTicketNumber, powerballDrawing: PowerballDrawing): number {
    let matchCount = 0;
    if (this.getMatch(powerballTicketNumber.number01, powerballDrawing)) {
      matchCount++;
    }
    if (this.getMatch(powerballTicketNumber.number02, powerballDrawing)) {
      matchCount++;
    }
    if (this.getMatch(powerballTicketNumber.number03, powerballDrawing)) {
      matchCount++;
    }
    if (this.getMatch(powerballTicketNumber.number04, powerballDrawing)) {
      matchCount++;
    }
    if (this.getMatch(powerballTicketNumber.number05, powerballDrawing)) {
      matchCount++;
    }
    return matchCount;
  }

  private getMatch(ticketNumber: number, powerballDrawing: PowerballDrawing): boolean {
    return (
      ticketNumber === powerballDrawing.number01 ||
      ticketNumber === powerballDrawing.number02 ||
      ticketNumber === powerballDrawing.number03 ||
      ticketNumber === powerballDrawing.number04 ||
      ticketNumber === powerballDrawing.number05
    );
  }

  private convert(powerballDrawingEntries: Array<PowerballDrawingEntry>): Array<PowerballDrawing> {
    const powerballDrawings: Array<PowerballDrawing> = [];
    for (const powerballDrawingEntry of powerballDrawingEntries) {
      const powerballNumbers = powerballDrawingEntry.field_winning_numbers.split(',');
      const powerballDrawing: PowerballDrawing = {
        drawingDate: moment(powerballDrawingEntry.field_draw_date).toDate(),
        number01: +powerballNumbers[0],
        number02: +powerballNumbers[1],
        number03: +powerballNumbers[2],
        number04: +powerballNumbers[3],
        number05: +powerballNumbers[4],
        powerNumber: +powerballNumbers[5],
        multiplier: +powerballDrawingEntry.field_multiplier,
        createDate: moment().toDate(),
        updateDate: moment().toDate()
      };
      powerballDrawings.push(powerballDrawing);
    }
    return powerballDrawings;
  }
}
