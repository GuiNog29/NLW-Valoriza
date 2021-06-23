import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const creteTagController = new CreateTagController();

router.use(ensureAdmin);
router.post('/tags', ensureAdmin, creteTagController.handle);
router.post('/users', createUserController.handle);

export { router };