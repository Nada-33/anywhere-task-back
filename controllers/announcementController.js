import Announcement from "../models/announcementModel.js";
import User from "../models/userModel.js";

//create announcement
export const createAnnouncement = async (req, res) => {
    try {
        const { userId, content, courseName } = req.body
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(user);
        if (user && user.occupation == 'instructor') {
            const newAnnouncement = new Announcement({
                // userData
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                picturePath: user.picturePath || "",
              
                //announcementData
                courseName,
                content,
            });
            await newAnnouncement.save();
            const announcement = await Announcement.find();
            console.log(announcement);
            res.status(201).json(announcement);
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}
//get announcement
export const getAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.find();
        res.status(200).json(announcement);
        console.log(announcement)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
//update announcement
export const updateAnnouncement = async (req, res) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updateAnnouncement)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
//delete Announcement
export const delteAnnouncement = async (req, res) => {
    try {
        const removeAnnouncement = await Announcement.findByIdAndRemove(req.params.id);
        res.json(removeAnnouncement);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}