import { type User } from "./user.model";

const users = [
  { id: "1", name: "John Doe", age: 30, isMarried: true },
  { id: "2", name: "Jane Reyes", age: 29, isMarried: false },
  { id: "3", name: "Alice Wonderland", age: 25, isMarried: false },
];

export class UserService {
  static getAllUsers() {
    return users;
  }

  static getUserById(id: string) {
    return users.find((user) => user.id === id);
  }

  static createUser(userData: Omit<User, "id">) {
    const newUser: User = { id: (users.length + 1).toString(), ...userData };
    users.push(newUser);
    return newUser;
  }

  static updateUser(id: string, updates: Partial<User>): User {
    let userUpdate: User | undefined;

    // Loop through users array to find the user by id
    users.forEach((user) => {
      if (user.id === id) {
        // Update user fields if present in the updates
        if (updates.name !== undefined) user.name = updates.name;
        if (updates.age !== undefined) user.age = updates.age;
        if (updates.isMarried !== undefined) user.isMarried = updates.isMarried;
        userUpdate = user;
      }
    });

    // If no user found, throw an error
    if (!userUpdate) {
      throw new Error(`User with id ${id} not found`);
    }
    return userUpdate;
  }

  static deleteUser(id: string) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error(`User with id ${id} not found`);
    const userDeleted = users.splice(index, 1)[0];
    return userDeleted;
  }
}
