const PurposeOfVisit = require('../models/M_purposeOfVisit');

exports.getPurpose_old = async (req, res) => {
    try {
        const purposeofvisit = new PurposeOfVisit({
            clinicId: "6735f3a1147b99ae10a5a51d",
            purpose: ['Fever', 'Cold', 'Running nose', 'Loose stools', 'Malaria'],
        });

        const data = await purposeofvisit.save();

        return res.status(200).json({
            statusCode: 200,
            status: "success",
            message: "Purpose sent successfully",
            response: data,
        });
    } catch (err) {
        console.error("Error in getPurpose:", err);
        return res.status(500).json({
            statusCode: 500,
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.getPurpose = async (req, res) => {
    try {

        const existingPurpose = await PurposeOfVisit.findOne({
            clinicId: "6735f3a1147b99ae10a5a51d",
        });

        if (existingPurpose) {
            // return res.status(200).json({
            //     statusCode: 200,
            //     status: "success",
            //     message: "Purpose already exists",
            //     response: existingPurpose,
            // });
            return res.status(200).json({
                statusCode: 200,
                status: "success",
                message: "Purpose sent successfully",
                response: existingPurpose,
            });
        }

        const purposeofvisit = new PurposeOfVisit({
            clinicId: "6735f3a1147b99ae10a5a51d",
            purpose: ['Fever', 'Cold', 'Running nose', 'Loose stools', 'Malaria', 'Vaccine'],
        });

        const data = await purposeofvisit.save();

        return res.status(200).json({
            statusCode: 200,
            status: "success",
            message: "Purpose sent successfully",
            response: data,
        });
    } catch (err) {
        console.error("Error in getPurpose:", err);
        return res.status(500).json({
            statusCode: 500,
            status: "error",
            message: "Internal server error.",
        });
    }
};