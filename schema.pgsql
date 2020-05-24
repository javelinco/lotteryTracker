CREATE TABLE PowerballTicket (
    TicketId UUID NOT NULL PRIMARY KEY,
    PurchaseDate TIMESTAMP NOT NULL,
    Cost MONEY NOT NULL,
    PowerPlay Boolean DEFAULT FALSE,
    OwnerId UUID,
    CreateDate TIMESTAMP NOT NULL,
    UpdateDate TIMESTAMP NOT NULL
);

CREATE TABLE PowerballTicketNumber (
    TicketNumberId UUID NOT NULL PRIMARY KEY,
    TicketId UUID NOT NULL REFERENCES PowerballTicket(TicketId),
    Number01 INTEGER NOT NULL,
    Number02 INTEGER NOT NULL,
    Number03 INTEGER NOT NULL,
    Number04 INTEGER NOT NULL,
    Number05 INTEGER NOT NULL,
    PowerNumber INTEGER NOT NULL,
    CreateDate TIMESTAMP NOT NULL,
    UpdateDate TIMESTAMP NOT NULL
);

CREATE TABLE PowerballTicketDrawing (
    TicketId UUID NOT NULL REFERENCES PowerballTicket(TicketId),
    DrawingDate DATE NOT NULL,
    CreateDate TIMESTAMP NOT NULL,
    UpdateDate TIMESTAMP NOT NULL,
    PRIMARY KEY (TicketId, DrawingDate)
);

CREATE TABLE PowerballDrawing (
    DrawingDate DATE NOT NULL PRIMARY KEY,
    Number01 INTEGER NOT NULL,
    Number02 INTEGER NOT NULL,
    Number03 INTEGER NOT NULL,
    Number04 INTEGER NOT NULL,
    Number05 INTEGER NOT NULL,
    PowerNumber INTEGER NOT NULL,
    CreateDate TIMESTAMP NOT NULL,
    UpdateDate TIMESTAMP NOT NULL
);

CREATE TABLE OwnerWinning (
    TicketId UUID NOT NULL REFERENCES PowerballTicket(TicketId),
    DrawingDate DATE NOT NULL,
    Amount MONEY NOT NULL,
    CreateDate TIMESTAMP NOT NULL,
    UpdateDate TIMESTAMP NOT NULL,
    PRIMARY KEY (TicketId, DrawingDate)
);