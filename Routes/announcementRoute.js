import express from "express";
import { createAnnouncement, getAnnouncement, updateAnnouncement, delteAnnouncement } from "../controllers/announcementController.js"
import { verifyToken } from "../middleWare/auth.js"

const router = express.Router();
//create
router.post("/", verifyToken, createAnnouncement);
//get
router.get("/",verifyToken, getAnnouncement);
//update
router.put("/:id", verifyToken, updateAnnouncement);
//delete
router.delete("/:id", verifyToken, delteAnnouncement);

export default router