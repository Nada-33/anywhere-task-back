import express from 'express';
import { createQuiz, createCourse, getQuiz, updateQuiz, deleteQuiz, createAssignment } from "../controllers/coursesController.js";
import { verifyToken } from "../middleWare/auth.js"
const router = express.Router();
//create course
router.post("/course", verifyToken, createCourse);
//create quiz
router.post("/quiz", verifyToken, createQuiz);
//create Assignment
router.post("/assignment", verifyToken, createAssignment);
//get quiz
router.get("/quiz",verifyToken, getQuiz);
//update quiz
router.put("/quiz/:id", verifyToken, updateQuiz);
//delete quiz
router.delete("/quiz/:id", verifyToken, deleteQuiz);
export default router