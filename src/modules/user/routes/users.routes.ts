import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../controllers/CreateUserController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { ListUserController } from "../controllers/ListUserController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import uploadConfig from "../../../config/upload";

const usersRouter = Router();
const createController = new CreateUserController();
const listController = new ListUserController();
const updateController = new UpdateUserController();
const deleteController = new DeleteUserController();


const uploadMulter = multer(uploadConfig);
usersRouter.get("/", listController.listAll);

usersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listController.listById
);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      birthDate: Joi.string().isoDate().required(),
    },
  }),
  createController.hundle
);

usersRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(6).required(),
      
      birthDate: Joi.string().isoDate().required(),
    },
  }),
  updateController.updateUser
);

usersRouter.patch(
  "/password/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      oldPassword: Joi.string().min(6).required(),
      newPassword: Joi.string().min(6).required(),
    },
  }),
  updateController.updatePass
);

usersRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteController.hundle
);

usersRouter.patch(
  "/avatar/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  uploadMulter.single('avatar'),
  updateController.updateAvatar
);

export {usersRouter};
