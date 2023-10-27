import mongoose from "mongoose";
const AnnouncementSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    picturePath: {
        type: String,
        default: "",
    },
    courseName: {
        type: String,
        required: true,
        min: 5,
        max: 50,
    },
    content: {
        type: String,
        required: true,
        min: 10,
        max: 100,
    }
})
const Announcement =mongoose.model("Announcement",AnnouncementSchema);
export default Announcement;