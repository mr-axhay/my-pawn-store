import User from "../models/user.model.js";

// Reset Password Controller (no encryption)
export const resetPassword = async (req, res) => {
    const { decodedEmail, password } = req.body;

    if (!decodedEmail || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const user = await User.findOne({ email: decodedEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update password directly in plain text
        user.password = password;
        await user.save();

        res.json({ message: "Password reset successfully", info: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error"+err });
    }
};