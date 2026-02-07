
import User from "../models/user.js";

async function handleusersignup(req, res) {
    const { name, email, password } = req.body;

    try {
        // Use 'await' so the code waits for MongoDB to finish
        const newUser = await User.create({
            name,
            email,
            password,
        });

        // Send a success response back to the user
        return res.status(201).json({ 
            message: "User registered successfully!", 
            userId: newUser._id 
        });

    } catch (error) {
        // Handle the duplicate email error specifically
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists!" });
        }

        // Handle other validation errors (like password too short)
        return res.status(500).json({ error: error.message });
    }
}

export default handleusersignup;
