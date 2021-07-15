import { Router } from "express"
import DeleteMemberController from "../controllers/user/DeleteMemberController"
import GetMemberController from "../controllers/user/GetMemberController"
import GetMembersController from "../controllers/user/GetMembersController"
import UpdateMemberController from "../controllers/user/UpdateMemberController"
import UpdatePasswordController from "../controllers/user/UpdatePasswordController"
import protect from "../middlewares/auth/Protect"
import role from "../middlewares/auth/Role"

const router = Router()

router.use(protect)

router.put("/password", UpdatePasswordController)

router.get("/", GetMemberController)

router.get("/all", GetMembersController)

router
  .route("/:id")
  .get(GetMemberController)
  .put(role(["a"]), UpdateMemberController)
  .delete(role(["a"]), DeleteMemberController)

export default router
