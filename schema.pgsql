/* Create Table PowerBallTicket */
CREATE TABLE PowerBallTicket (
    TicketId UUID PRIMARY KEY,
    PurchaseDate TIMESTAMP NOT NULL,
    Cost NUMERIC(10,2) NOT NULL,
    PowerPlay Boolean DEFAULT FALSE,
    OwnerId UUID,
    CreateDate TIMESTAMP NOT NULL,
    UpdateDate TIMESTAMP NOT NULL
);

/* Create Table PowerballTicketNumber */
CREATE TABLE PowerballTicketNumber (
    
)