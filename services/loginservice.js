const users = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ARCHENTS@123';

async function fcnLogin(
    data
) {
    try {
        console.log("data in service", data);
        const user = await users.findOne({ email: data.email });

        if (!user) {
            return { message: "User not found", statusCode: "F" };
        }
        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            return { message: "Invalid Password.", statusCode: "F" };
        }
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
        // console.log(usersData);
        return { message: "Login successful", user: user, token: token, statusCode: "S" };
    } catch (err) {
        logger.error("Error: " + err);
        throw err;
    }
}


exports.loginService = {
    fcnLogin: fcnLogin
}