import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController{
  async hundle(request: Request, response: Response){
    const service = new DeleteUserService();
    const id = request.params.id;
    return response.status(204).json(await service.execute(id));
  }
}

export {DeleteUserController}
