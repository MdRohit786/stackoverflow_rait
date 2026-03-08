import express from "express";
import {
  getallusers,
  Login,
  Signup,
  updateprofile,
} from "../controller/auth.js";

const router = express.Router();
import auth from "../middleware/auth.js";
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getalluser", getallusers);
router.patch("/update/:id", auth,updateprofile);
export default router;
router.patch("/save/:id", auth, async (req, res) => {
  try {
    const { questionId } = req.body;
    const existingUser = await (await import("../models/auth.js")).default.findById(req.params.id);
    if (!existingUser) return res.status(404).json({ message: "User not found" });
    const alreadySaved = existingUser.saves.includes(questionId);
    const updatedUser = await (await import("../models/auth.js")).default.findByIdAndUpdate(
      req.params.id,
      alreadySaved
        ? { $pull: { saves: questionId } }
        : { $addToSet: { saves: questionId } },
      { new: true }
    );
    res.status(200).json({ data: updatedUser, saved: !alreadySaved });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong..");
  }
});
