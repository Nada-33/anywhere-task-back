import mongoose from "mongoose";
const WorkSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            default: ''
        },
        topic: {
            type: String,
            required: true,
        },
        grade: {
            type: Number
        },
        type: {
            type: String,
            enum: ["quiz", "assignement"],
            required: true,
        },
        dueDate: {
            type: Date,
            default: () => new Date(+new Date() + 24 * 60 * 60 * 1000),
            //set default after 24 hours
        }

    })
const Work = mongoose.model("Work", WorkSchema);
export default Work;