import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma/prisma";

interface IRequest {
  id: string;
  name: string;
  birthDate: string | Date;
}

class UpdateUserService {
  async execute({ id, name, birthDate }: IRequest) {
    let user = await prismaClient.user.findUnique({ where: { id } });
    if(!user){
      throw new AppError("User not found");
    }
    user = await prismaClient.user.update({where: {id}, data: {name, birthDate}});
    delete user.password;
    return user;
  }
}

export { UpdateUserService };
