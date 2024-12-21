const Prescription = require('../models/prescription');

exports.createPrescription = async (req, res) => {
    try {
        const prescriptionData = {
            clinicId: "6735f3a1147b99ae10a5a51d",
            details: {
                syrup: {
                    1: "simple syrup",
                    2: "honey syrup",
                    3: "flavored syrups"
                },
                tablet: {
                    1: "Paracetamol",
                    2: "Ibuprofen",
                    3: "Aspirin"
                },
                ointment: {
                    1: "petrolatum",
                    2: "lanolin",
                    3: "zinc oxide"
                }
            }
        };

        const newPrescription = new Prescription(prescriptionData);

        const savedPrescription = await newPrescription.save();

        res.status(201).json({
            statusCode: 201,
            status: "success",
            message: "Prescription created successfully.",
            prescription: savedPrescription
        });
    } catch (error) {
        console.error("Error creating prescription:", error);
        res.status(500).json({
            statusCode: 500,
            status: "error",
            message: "Failed to create prescription."
        });
    }
};


exports.searchPrescription = async (req, res) => {
    try {
        const { medicName, searchText } = req.query;

        if (!medicName || !searchText) {
            return res.status(400).json({
                statusCode: 400,
                status: "error",
                message: "Please provide both medicName and searchText."
            });
        }

        const prescription = await Prescription.findOne();

        if (!prescription) {
            return res.status(404).json({
                statusCode: 404,
                status: "error",
                message: "No prescription data found."
            });
        }

        const medicData = prescription.details[medicName];

        if (!medicData) {
            return res.status(404).json({
                statusCode: 404,
                status: "error",
                message: `No data found for medicName: ${medicName}`
            });
        }

        const matchingResults = Object.values(medicData).filter((item) =>
            item.toLowerCase().includes(searchText.toLowerCase())
        );

        if (matchingResults.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                status: "error",
                message: `No matching results found for searchText: ${searchText}`
            });
        }

        res.status(200).json({
            statusCode: 200,
            status: "success",
            message: "Matching results found.",
            results: matchingResults
        });
    } catch (error) {
        console.error("Error searching prescription:", error);
        res.status(500).json({
            statusCode: 500,
            status: "error",
            message: "Failed to search prescription data."
        });
    }
};
