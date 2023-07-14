import { usersList } from "../data/users";
import { Database } from "../database/config/database.connection";
import { UserEntity } from "../database/entities/user.entity";
import { User } from "../models/user.model";

export class UserRepository {
  private connection = Database.connection.getRepository(UserEntity);

  public async list() {
    const results = await this.connection.find();

    return results.map((entity) => UserRepository.mapRowToModel(entity));
  }

  public async get(id: string) {
    // const result = await this.connection.query(`
    //   select * from transactions.users where id = '${id}'
    // `);

    const result = await this.connection.findOne({
      where: {
        id,
      },
    });

    if (!result) {
      return result;
    }

    return UserRepository.mapRowToModel(result);
  }

  public getByCpf(cpf: number) {
    return usersList.find((user) => user.cpf === cpf);
  }

  public getByEmail(email: string) {
    return usersList.find((user) => user.email === email);
  }

  public static mapRowToModel(entity: UserEntity): User {
    return User.create(entity);
  }
}
