import { Router } from "express"
import CreateTitleController from "../controllers/title/CreateTitleController"
import DeleteTitleController from "../controllers/title/DeleteTitleController"
import GetTitleController from "../controllers/title/GetTitleController"
import GetTitlesController from "../controllers/title/GetTitlesController"
import protect from "../middlewares/auth/Protect"
import role from "../middlewares/auth/Role"

const router = Router()

router.use(protect)

router.post("/", role(["a"]), CreateTitleController)

router.get("/all", GetTitlesController)

router
  .route("/:id")
  .get(GetTitleController)
  .delete(role(["a"]), DeleteTitleController)

export default router
