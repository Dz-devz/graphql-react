import { UserService } from "./user.service";

export class UserController {
  static async getUsers() {
    return UserService.getAllUsers();
  }

  static async getUserById(id: string) {
    return UserService.getUserById(id);
  }

  static async createUser(name: string, age: number, isMarried: boolean) {
    return UserService.createUser({ name, age, isMarried });
  }

  static async updateUser(
    id: string,
    name?: string,
    age?: number,
    isMarried?: boolean
  ) {
    return UserService.updateUser(id, { name, age, isMarried });
  }

  static async deleteUser(id: string) {
    return UserService.deleteUser(id);
  }
}
