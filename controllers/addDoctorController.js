const Doctor = require('../models/addDoctor');
const mongoose = require('mongoose');


exports.addDoctor = async (req, res) => {
    try {
        
        const { clinicId, doctorName, specialty, mobile, email, workhours ,consulting_fees} = req.body;

        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {
            return res.status(200).json({
                response: "failed",
                message: "A doctor with this email already exists. Please use a different email.",
            });
        }

        const newDoctor = new Doctor({
            clinicId,
            doctorName,
            specialty,
            mobile,
            email,
			workhours,
			consulting_fees,
            createdDate: new Date(),
            updatedDate: new Date(),
        });

        await newDoctor.save();

        return res.status(201).json({
            response: "Succeeded",
            message: "Doctor added successfully.",
        });
    } catch (error) {
        console.error("Error adding doctor:", error);
        return res.status(500).json({
            response: "error",
            message: "Failed to add doctor due to an internal server error.",
        });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        // const {  } = req.params;
        const { doctorId, clinicId, doctorName, specialty, mobile, email, workhours, consulting_fees } = req.body;
        // const doctor = await Doctor.findById(_id: mongoose.Types.ObjectId(doctorId));
        // const doctor = await Doctor.findOne({ _id: mongoose.Types.ObjectId(doctorId) });
        const doctor = await Doctor.findOne({ _id: new mongoose.Types.ObjectId(doctorId) });

        if (!doctor) {
            return res.status(404).json({
                error: 'Doctor not found.'
            });
        }

        if (clinicId) doctor.clinicId = clinicId;
        if (doctorName) doctor.doctorName = doctorName;
        if (specialty) doctor.specialty = specialty;
        if (mobile) doctor.mobile = mobile;
        if (email) doctor.email = email;
        if (workhours) doctor.workhours = workhours;
        if (consulting_fees) doctor.consulting_fees = consulting_fees;



        doctor.updatedDate = new Date();
        await doctor.save();

        return res.status(200).json({
            response: "Succeeded",
            message: "Doctor updated successfully.",
        });
    } catch (error) {
        console.error('Error updating doctor:', error);
        return res.status(500).json({
            response: "error",
            message: "Failed to update doctor due to an internal server error.",
        });
    }
};

exports.getDoctorsByClinic = async (req, res) => {
    try {
        const { clinicId } = req.query;
        const doctors = await Doctor.find({ clinicId });

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({
                error: `No doctors found for clinic with ID ${clinicId}.`
            });
        }

        const doctorCount = doctors.length;

        res.status(200).json({
            message: `Successfully fetched ${doctorCount} doctors for the clinic.`,
            doctorCount,
            doctors
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors.' });
    }
};
