import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma/prisma";
import uploadConfig from "../../../config/upload";
import path from "path";
import fs from "fs";

class DeleteUserService{
  async execute(id: string){
    const user = await prismaClient.user.findUnique({where: {id}});
    if(!user){
      throw new AppError("User not found");
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    await prismaClient.user.delete({where: {id}});
    return {};
  }
}

export {DeleteUserService}
