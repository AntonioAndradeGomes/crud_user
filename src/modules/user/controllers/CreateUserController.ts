import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController{
  async hundle(request: Request, response: Response){
    const {name, password, email, birthDate} = request.body;
    const service = new CreateUserService();
    return response.status(201).json(await service.execute({ name, password, email, birthDate}));
  }
}

export {CreateUserController}
