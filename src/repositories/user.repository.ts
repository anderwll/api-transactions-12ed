import { usersList } from "../data/users";
import { Database } from "../database/config/database.connection";
import { UserEntity } from "../database/entities/user.entity";
import { User } from "../models/user.model";

export class UserRepository {
  private connection = Database.connection.getRepository(UserEntity);

  public async create(user: User) {
    const userEntity = this.connection.create({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      age: user.age,
      password: user.password,
    });

    const results = await this.connection.save(userEntity);

    return UserRepository.mapRowToModel(results);
  }

  public async list() {
    const results = await this.connection.find();

    return results.map((entity) => UserRepository.mapRowToModel(entity));
  }

  public async get(id: string) {
    const result = await this.connection.findOne({
      where: {
        id,
      },
      // relations: {
      //   transactions: true,
      // },
    });

    if (!result) {
      return result;
    }

    return UserRepository.mapRowToModel(result);
  }

  public async existByCpf(cpf: string) {
    const results = await this.connection.exist({ where: { cpf } });

    return results;
  }

  public async getByEmail(email: string) {
    const results = await this.connection.findOne({ where: { email } });

    if (!results) {
      return undefined;
    }

    return UserRepository.mapRowToModel(results);
  }

  public exist(id: string) {
    const result = this.connection.exist({ where: { id } });

    return result;
  }

  public static mapRowToModel(entity: UserEntity | null): User {
    return User.create(entity);
  }
}
