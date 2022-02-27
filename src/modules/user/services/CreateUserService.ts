import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma/prisma";
import { hash } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
  name: string;
  birthDate: string | Date;
}

class CreateUserService {
  async execute({ email, password, name, birthDate }: IRequest) {
    let user = await prismaClient.user.findUnique({ where: { email } });

    if (user) {
      throw new AppError("User already exists.");
    }

    if (password.length < 6) {
      throw new AppError("Weak password");
    }

    const hashPass = await hash(password, 8);

    user = await prismaClient.user.create({
      data: { name, email, password: hashPass, birthDate },
    });

    delete user.password;

    return user;
  }
}

export { CreateUserService };
