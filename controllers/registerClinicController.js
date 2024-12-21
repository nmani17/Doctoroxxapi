// controllers/registerClinicController.js
const RegisterClinicModel = require('../models/registerClinic');
const bcrypt = require('bcryptjs'); // Require bcryptjs for password hashing
// exports.registerClinic = async (req, res) => {
//     try {
//         console.log('Entering the registerClinic function...');
//         const newClinic = new RegisterClinicModel(req.body);

//         await newClinic.save();

//         res.status(201).send(newClinic);
//     } catch (error) {
//         if (error.code === 11000) {
//             console.error('Duplicate key error:', error);
//             return res.status(400).json({
//                 error: 'A clinic with this email already exists. Please use a different email.'
//             });
//         }

//         console.error('Error registering clinic:', error);
//         res.status(500).json({ error: 'Failed to register clinic' });
//     }
// };

exports.registerClinic = async (req, res) => {
    try {
        const email = req.body.email;

        if (!email || typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({
                statuscode: 400,
                status: "error",
                message: "Invalid email provided.",
            });
        }

        const existingClinic = await RegisterClinicModel.findOne({ emailaddress: email });

        if (existingClinic) {
            return res.status(400).json({
                statuscode: 400,
                status: "error",
                message: "Email already exists.",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newClinic = new RegisterClinicModel({
            emailaddress: email,
            password: hashedPassword,
            clinicName: req.body.clinicName,
            streetAddress: req.body.streetAddress,
            streetAddress2: req.body.streetAddress2,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
        });

        const savedClinic = await newClinic.save();

        res.status(201).json({
            statuscode: 201,
            status: "success",
            response: "succeeded",
            message: "A clinic registered successfully",
            result: { clinicId: savedClinic._id },
        });
    } catch (error) {
        console.error("Error registering clinic:", error);

        res.status(500).json({
            statuscode: 500,
            status: "error",
            response: "error",
            message: "Failed to register clinic due to an internal server error.",
            error: error.message,
        });
    }
};


