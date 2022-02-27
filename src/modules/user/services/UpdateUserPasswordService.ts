import { compare, hash } from "bcryptjs";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma/prisma";

interface IRequest {
  id: string;
  newPassword: string;
  oldPassword: string;
}

class UpdateUserPasswordService {
  // 1 - buscar o usuario
  // 2 - verificar se o antigo password é correto
  // 3 - criptografar o novo password
  // 4 - atualizar o password
  async execute({ id, newPassword, oldPassword }: IRequest) {
    let user = await prismaClient.user.findUnique({ where: { id } });
    if(!user){
      throw new AppError("User not found");
    }

    const passwordConfirmed = await compare(oldPassword, user.password);
    
    if (!passwordConfirmed) {
      throw new AppError("Iconrrect old password");
    }
    const hashPass = await hash(newPassword, 8);
    user = await prismaClient.user.update({where : {id}, data: {password: hashPass,}});
    delete user.password;
    return user;
  }
}

export { UpdateUserPasswordService };
