import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        userOccupation: {
            type: String,
            default: "instructor",
            required: true
        },
        topic: {
            type: String,
            default: "",
        },
        students: {
            type: String,
            default: []
        },
        grade: {
            type: Number
        },
        work: [
            {
                type: {
                    type: String, // 'quiz' or 'assignment'
                    required: true
                },
                topic: String,
                dueDate: Date,
            }
        ]


    })
const Course = mongoose.model("Course", CourseSchema);
export default Course;