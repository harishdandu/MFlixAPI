const users = require("../models/usermodel");
const bcrypt = require("bcrypt");


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
        // console.log(usersData);
        return { message: "Login successful", user: user, statusCode: "S" };
    } catch (err) {
        logger.error("Error: " + err);
        throw err;
    }
}


exports.loginService = {
    fcnLogin: fcnLogin
}