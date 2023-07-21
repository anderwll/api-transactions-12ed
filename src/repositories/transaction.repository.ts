import { transactionsList } from "../data/transactions";
import { Database } from "../database/config/database.connection";
import { TransactionEntity } from "../database/entities/transaction.entity";
import { UserEntity } from "../database/entities/user.entity";
import { Transaction, TransactionType } from "../models/transaction.model";
import { User } from "../models/user.model";
import { UserRepository } from "./user.repository";

interface ListTransactionsParams {
  userId: string;
  type?: TransactionType;
}

export class TransactionRepository {
  private connection = Database.connection.getRepository(TransactionEntity);

  public async create(transaction: Transaction, user: User) {
    const transactionEntity = await this.connection.create({
      id: transaction.id,
      title: transaction.title,
      type: transaction.type,
      value: transaction.value,
      userId: transaction.user.id,
    });

    const results = await this.connection.save(transactionEntity);

    return this.mapRowToModel(results, user);
  }

  public async list(params: ListTransactionsParams, user: User) {
    const result = await this.connection.find({
      where: { userId: params.userId, type: params.type },
      relations: { user: true },
    });

    return result.map((row: any) => this.mapRowToModel(row, user));
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

  private mapRowToModel(entity: TransactionEntity, user: User) {
    return Transaction.create(entity, user);
  }
}
