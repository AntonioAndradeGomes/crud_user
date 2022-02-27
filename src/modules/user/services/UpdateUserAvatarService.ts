
import path from "path";

import fs from "fs";
import prismaClient from "../../../prisma/prisma";
import { AppError } from "../../../errors/AppError";
import uploadConfig from "../../../config/upload";

interface IRequest {
  id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  async execute({ id, avatarFileName }: IRequest) {
    let user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError("User not found.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user = await prismaClient.user.update({
      where: { id },
      data: { avatar: avatarFileName },
    });

    delete user.password;

    return user
  }
}

export { UpdateUserAvatarService };
