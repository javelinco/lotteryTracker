import { Client } from 'ts-postgres';

export class DbConnection {
  private static _client: Client;

  public static async getConnection(): Promise<Client> {
    if (this._client === undefined) {
      this._client = new Client({
        host: process.env.POSTGRES_ENDPOINT,
        database: process.env.POSTGRES_INSTANCE_ID,
        port: 5432,
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD
      });

      await this._client.connect();
    } else if (this._client.closed) {
      await this._client.connect();
    }
    return this._client;
  }

  public static async closeConnection() {
    if (!this._client.closed) {
      await this._client.end();
    }
  }
}
