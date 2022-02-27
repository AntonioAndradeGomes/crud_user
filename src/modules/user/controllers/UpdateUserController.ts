import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";
import { UpdateUserPasswordService } from "../services/UpdateUserPasswordService";
import { UpdateUserService } from "../services/UpdateUserService";


class UpdateUserController{

  async updateUser(request: Request, response: Response){
    const service = new UpdateUserService();
    const {name, birthDate} = request.body;
    const id = request.params.id;
    return response.json(await service.execute({name, id, birthDate}));
  }

  async updatePass(request: Request, response: Response){
    const service = new UpdateUserPasswordService();
    const {oldPassword, newPassword} = request.body;
    const id = request.params.id;
    return response.json(await service.execute({id, newPassword, oldPassword}));
  }


  async updateAvatar(request: Request, response: Response){
    const service = new UpdateUserAvatarService();
    const user = await service.execute({
      id: request.params.id,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}


export {UpdateUserController};
