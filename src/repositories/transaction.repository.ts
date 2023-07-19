import { transactionsList } from "../data/transactions";
import { Database } from "../database/config/database.connection";
import { TransactionEntity } from "../database/entities/transaction.entity";
import { UserEntity } from "../database/entities/user.entity";
import { Transaction, TransactionType } from "../models/transaction.model";
import { UserRepository } from "./user.repository";

interface ListTransactionsParams {
  userId: string;
  type?: TransactionType;
}

export class TransactionRepository {
  private connection = Database.connection.getRepository(TransactionEntity);

  public async create(transaction: Transaction) {
    let query = `insert into transactions.transaction `;
    query += `(id, title, value, type, id_user) `;
    query += `values`;
    query += `('${transaction.id}', '${transaction.title}', ${transaction.value}, '${transaction.type}', '${transaction.user.id}')`;

    await this.connection.query(query);
  }

  public async list(params: ListTransactionsParams) {
    const result = await this.connection.find({
      where: { userId: params.userId, type: params.type },
      relations: { user: true },
    });

    return result.map((row: any) => this.mapRowToModel(row));
  }

  public get(id: string) {
    return transactionsList.find((transaction) => transaction.id === id);
  }

  public getIndex(id: string) {
    return transactionsList.findIndex((transaction) => transaction.id === id);
  }

  public async delete(id: string) {
    const result = await this.connection.query(
      `delete from transactions.transaction where id = '${id}'`
    );
    console.log(result);

    return result.rowCount;
  }

  private mapRowToModel(row: any) {
    const user = UserRepository.mapRowToModel(row.user);

    return Transaction.create(row, user);
  }
}
