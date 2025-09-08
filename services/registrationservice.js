const users = require("../models/usermodel");
const bcrypt = require("bcrypt");


async function fcnRegistration(
    data
) {
    try {
        console.log("data in fcnRegistration", data);
        const user = await users.findOne({ email: data.email });

        if (user) {
            return { message: "User already exists.", statusCode: "F" };
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // Create new user document
        const newUser = new users({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        return { message: "User registered successfully.", statusCode: "S" };
    } catch (err) {
        logger.error("Error: " + err);
        throw err;
    }
}


exports.registrationService = {
    fcnRegistration: fcnRegistration
}