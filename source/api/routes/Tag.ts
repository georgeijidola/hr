import { Router } from "express"
import CreateTagController from "../controllers/tag/CreateTagController"
import DeleteTagController from "../controllers/tag/DeleteTagController"
import GetTagController from "../controllers/tag/GetTagController"
import GetTagsController from "../controllers/tag/GetTagsController"
import protect from "../middlewares/auth/Protect"
import role from "../middlewares/auth/Role"

const router = Router()

router.use(protect)

router.post("/", role(["a"]), CreateTagController)

router.get("/all", GetTagsController)

router
  .route("/:id")
  .get(GetTagController)
  .delete(role(["a"]), DeleteTagController)

export default router
