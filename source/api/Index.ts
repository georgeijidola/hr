import { Router } from "express"
import Auth from "./routes/Auth"
import Tag from "./routes/Tag"
import Title from "./routes/Title"
import User from "./routes/User"

const router = Router()

router.use("/auth", Auth)
router.use("/tag", Tag)
router.use("/title", Title)
router.use("/user", User)

export default router
