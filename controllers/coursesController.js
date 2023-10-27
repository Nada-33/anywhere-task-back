import Course from "../models/coursesModel.js";
import Work from "../models/workModel.js";
import User from "../models/userModel.js"
// create course
export const createCourse = async (req, res) => {
    try {

        const { userId, topic,students } = req.body;
        const user = await User.findById(userId);
        // console.log("user:", user);
        if (user && user.occupation === 'instructor') {
            const newCourse = new Course({
                userId,
                topic,
                students
            });
            await newCourse.save();
            const courses = await Course.find();
            res.status(201).json(courses);
        } else {
            console.log("Access denied - User data:", user);
            res.status(403).json({ message: "Access denied" });
        }

    } catch (err) {
        res.status(409).json({ message: err.message });

    }
}

// create quiz
export const createQuiz = async (req, res) => {
    try {
        const { courseId, topic, dueDate } = req.body;
        const course = await Course.findById(courseId);
        // console.log("courseId:", courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const newQuiz = new Work({
            courseId,
            type: "quiz",
            topic,
            dueDate
        });
        course.work.push(newQuiz);
        await newQuiz.save();
        await course.save();
        const quizzes = course.work.filter((item) => item.type === "quiz");
        res.status(201).json(quizzes);
    } catch (err) {
        res.status(409).json({ message: err.message });

    }
}
// create assigenment
export const createAssignment = async (req, res) => {
    try {
        const { courseId, topic, dueDate } = req.body;
        const course = await Course.findById(courseId);
        console.log("courseId:", courseId);
        console.log(course);
      
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const newAssignement = new Work({
            courseId,
            type: "assignement",
            topic,
            dueDate
        });
        course.work.push(newAssignement);
        await newAssignement.save();
        await course.save();
        const assignements = course.work.filter((item) => item.type === "assignement");
        res.status(201).json(assignements);
    } catch (err) {
        res.status(409).json({ message: err.message });

    }
}
//get quiz
export const getQuiz = async (req, res) => {
    try {
        const quiz = await Work.find();
        res.status(200).json(quiz)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
//update quiz
export const updateQuiz = async (req, res) => {
    try {
        const quiz = await Work.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(quiz)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
//delete quiz
export const deleteQuiz = async (req, res) => {
    try {
        const removeQuiz = await Work.findByIdAndRemove(req.params.id)
        if (!removeQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(removeQuiz);
        // console.log(removeQuiz);
        // console.log(req.params.id);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

