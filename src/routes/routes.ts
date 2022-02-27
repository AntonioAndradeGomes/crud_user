import { Router } from "express";
import { usersRouter } from "../modules/user/routes/users.routes";

const router = Router();


router.get("/", (request, response) => {
    return response.json({message: "Hello world!"});
});


router.use('/users', usersRouter);

export {router};
