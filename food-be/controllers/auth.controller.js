import jwt from "jsonwebtoken";
import User from '../models/user.js'

const signToken = (id, role, country) => {
    return jwt.sign({ id, role, country },
        process.env.JWT_SECRET,
        { expiresIn: '7d' });
}

export const signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user._id, user.role, user.country);

        res.status(201).json({ token, user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
} 

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id, user.role, user.country);
    res.json({ token, user });
};