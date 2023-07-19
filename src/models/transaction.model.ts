import { v4 as uuidCreator } from "uuid";
import { User } from "./user.model";
import { TransactionEntity } from "../database/entities/transaction.entity";

export enum TransactionType {
  Income = "I",
  Outcome = "O",
}

export class Transaction {
  private _id: string;

  constructor(
    private _title: string,
    private _value: number,
    private _type: TransactionType,
    private _user: User
  ) {
    this._id = uuidCreator();
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get title(): string {
    return this._title;
  }
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    this._value = value;
  }
  public get type(): TransactionType {
    return this._type;
  }
  public set type(type: TransactionType) {
    this._type = type;
  }
  public get user(): User {
    return this._user;
  }

  public toJson(): any {
    return {
      id: this._id,
      title: this._title,
      type: this._type,
      value: this._value,
      user: this.user ? this._user.name : undefined,
    };
  }

  public static create(entity: any, userEntity: User) {
    const user = User.create(userEntity);

    const transaction = new Transaction(
      entity.title,
      Number(entity.value),
      entity.type,
      user
    );
    transaction._id = entity.id;

    return transaction;
  }
}
