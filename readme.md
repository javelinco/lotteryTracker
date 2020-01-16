# Lottery Tracker
The lottery tracking allows the user to input the tickets they have purchased, and track the drawings that occur. For each ticket valid for a drawing, the winnings and ROI will be tracked.

## Docker:
### To Build the Image for Development:
    npm run build:dev

### To Publish the Image:
    npm run publish:dev

### To Run the Image Locally:
    docker run --env-file .env -v src:/app/ -p 3050:3050 --name lottery-tracker mmunson/lottery-tracker

### To See the logs from Docker container:
    docker logs lottery-tracker

## Database Schema
The following describes the database schema.

### PowerballTicket
| Column Name | Type | Description |
| ----------- | ---- | ----------- |
| TicketId    | UniqueIdentifier, Not Null, Primary Key | The unique id of the ticket |
| PurchaseDate | DateTime, Not Null | The date & time the ticket was purchased |
| Cost | Money, Not Null | The cost of the ticket |
| PowerPlay | Boolean, Not Null, Default: false | Is it a power play ticket? |
| OwnerId | UniqueIdentifier, Null | The unique identifier of the owner of the ticket |
| CreateDate | DateTime, Not Null | The date & time the record was created |
| UpdateDate | DateTime, Not Null | The date & time the record was last updated |

### PowerballTicketNumber
| Column Name | Type | Description |
| ----------- | ---- | ----------- |
| TicketNumberId | UniqueIdentifier, Not Null, Primary Key | The unique id of the ticket number |
| TicketId    | UniqueIdentifier, Not Null | The unique id of the ticket |
| Number01 | Integer, Not Null | The first number |
| Number02 | Integer, Not Null | The second number |
| Number03 | Integer, Not Null | The third number |
| Number04 | Integer, Not Null | The fourth number |
| Number05 | Integer, Not Null | The fifth number |
| PowerNumber | Integer, Not Null | The power number |
| CreateDate | DateTime, Not Null | The date & time the record was created |
| UpdateDate | DateTime, Not Null | The date & time the record was last updated |

### PowerballTicketDrawing
| Column Name | Type | Description |
| ----------- | ---- | ----------- |
| TicketId    | UniqueIdentifier, Not Null, Primary Key | The unique id of the ticket |
| DrawingDate | Date, Not Null, Primary Key | The date of the drawing |
| CreateDate | DateTime, Not Null | The date & time the record was created |
| UpdateDate | DateTime, Not Null | The date & time the record was last updated |

### PowerballDrawing
| Column Name | Type | Description |
| ----------- | ---- | ----------- |
| DrawingDate | Date, Not Null, Primary Key | The date of the drawing |
| Number01 | Integer, Not Null | The first number |
| Number02 | Integer, Not Null | The second number |
| Number03 | Integer, Not Null | The third number |
| Number04 | Integer, Not Null | The fourth number |
| Number05 | Integer, Not Null | The fifth number |
| PowerNumber | Integer, Not Null | The power number |
| CreateDate | DateTime, Not Null | The date & time the record was created |
| UpdateDate | DateTime, Not Null | The date & time the record was last updated |

### OwnerWinning
| Column Name | Type | Description |
| ----------- | ---- | ----------- |
| TicketId    | UniqueIdentifier, Not Null, Primary Key | The unique id of the ticket |
| DrawingDate | Date, Not Null, Primary Key | The date of the drawing |
| Amount | Money, Not Null | The amount the ticket has won for a given drawing |
| CreateDate | DateTime, Not Null | The date & time the record was created |
| UpdateDate | DateTime, Not Null | The date & time the record was last updated |