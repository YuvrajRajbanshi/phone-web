import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (user)
            return res.json({ message: "User already exists", success: false })
        const hasPass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hasPass });
        res.json({ message: "User register successfully", success: true, user });
    } catch (error) {

        res.json({ message: error.message })
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) return res.json({ message: "User not found", success: false })

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.json({ message: "Invalid credential", success: false })

        res.json({ message: `Welcome ${user.name}`, success: true, user });

    } catch (error) {

        res.json({ message: error.message })

    }

}

export const users = async (req, res) => {
    try {
        let users = await User.find().sort({ createdAt: -1 });
        res.json(users)
    } catch (error) {

        res.json(error.message)
    }
}