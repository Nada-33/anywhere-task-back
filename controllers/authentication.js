import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            occupation,
        } = req.body;
        //encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        //create new user 
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            occupation
        })
        //save user and send to reesponse
        const savedUser = await newUser.save();
        console.log(savedUser)
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
export const login = async (req, res) => {
    try {
        //check email
        const { email, password } = req.body
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "user doesnt exist" });
        // console.log(user);
        //check pass 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invaild password" });
        //create token and deleting pass from db for secuirty 
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}