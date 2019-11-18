import { AddPowerBallDrawing } from "./addPowerBallDrawing";
import { drawingNumber } from "./interfaces/drawingNumber";
import { powerballNumber } from "./interfaces/powerballNumber";
import uuid = require("uuid");

async function getDrawingNumbers(drawingDate: Date): Promise<Array<drawingNumber>> {
    const drawingNumbers: Array<drawingNumber> = [
        {
            ticketId: uuid(),
            number01: 7,
            number02: 8,
            number03: 9,
            number04: 10,
            number05: 11,
            powerNumber: 6,
            powerPlay: true
        },
        {
            ticketId: uuid(),
            number01: 12,
            number02: 13,
            number03: 14,
            number04: 15,
            number05: 16,
            powerNumber: 17,
            powerPlay: true
        },
        {
            ticketId: uuid(),
            number01: 18,
            number02: 19,
            number03: 20,
            number04: 21,
            number05: 22,
            powerNumber: 23,
            powerPlay: false
        }
    ];

    return drawingNumbers;
}

describe('Add Powerball Drawing', () => {
    it('Should record real drawing', async () => {
        const drawingDate = new Date('11/6/2019');
        const number: powerballNumber = {
            number01: 15,
            number02: 28,
            number03: 46,
            number04: 62,
            number05: 64,
            powerNumber: 17
        };
        const multiplier = 3;
        const grandPrizeAmount = 0;
        const ownerWinnings = await AddPowerBallDrawing(
            drawingDate,
            number,
            multiplier,
            grandPrizeAmount,
            null,
            null,
            null
        );
        console.log('Winnings: ', ownerWinnings);
    });

    it('Should report single win with PowerNumber match only', async () => {
        const drawingDate = new Date('11/16/2019');
        const number: powerballNumber = {
            number01: 1,
            number02: 2,
            number03: 3,
            number04: 4,
            number05: 5,
            powerNumber: 6
        };
        const multiplier = 2;
        const grandPrizeAmount = 100000000;
        const ownerWinnings = await AddPowerBallDrawing(
            drawingDate,
            number,
            multiplier,
            grandPrizeAmount,
            getDrawingNumbers,
            null,
            null
        );
    
        expect(ownerWinnings).toBeTruthy();
        expect(ownerWinnings.length).toBe(3);
        expect(ownerWinnings[0].amount).toBe(8);
        expect(ownerWinnings[1].amount).toBe(0);
        expect(ownerWinnings[2].amount).toBe(0);
    });
});