const { labtestCollection } = require("../models/labtest");
const { response } = require("express");
const { ObjectId } = require('mongodb');

exports.labTest = async (req, res) => {
    try {
        labtest = new labtestCollection({
            "labtests": [
                {
                    "name": "Complete Blood Count (CBC)",
                    "description": "Measures red and white blood cells, hemoglobin, and platelets."
                },
                {
                    "name": "Blood Glucose Test",
                    "description": "Measures sugar levels in the blood to check for diabetes."
                },
                {
                    "name": "Lipid Profile",
                    "description": "Measures cholesterol levels, including HDL, LDL, and triglycerides."
                },
                {
                    "name": "Liver Function Tests (LFT)",
                    "description": "Measures enzymes and proteins related to liver health."
                },
                {
                    "name": "Kidney Function Tests",
                    "description": "Includes tests like Blood Urea Nitrogen (BUN) and Creatinine."
                },
                {
                    "name": "Thyroid Function Tests (TFT)",
                    "description": "Includes T3, T4, and TSH levels to assess thyroid health."
                },
                {
                    "name": "HbA1c Test",
                    "description": "Provides average blood sugar levels over the past 3 months."
                },
                {
                    "name": "Urinalysis",
                    "description": "Tests for urinary tract infections, kidney issues, or diabetes."
                },
                {
                    "name": "C-Reactive Protein (CRP)",
                    "description": "Indicates inflammation in the body."
                },
                {
                    "name": "COVID-19 RTPCR Test",
                    "description": "Detects SARS-CoV-2 virus."
                }
            ]

        })
        labtest.save();
        return res.status(200).json({
            message: "Sucess",
            data: labtest

        });

    }
    catch (error) {
        return res.status(400).json({
            message: "Server error",
            data: error.message
        });

    }
}



exports.getLabTest = async (req, res) => {
    try {

        const labTestData = await labtestCollection.findOne({
            _id: new ObjectId("675a7f5cb97c366d31ed966d")
        });


        if (labTestData) {
            return res.status(200).json({
                message: "Sucess",
                data: labTestData

            });
        }
        else {
            return res.status(404).json({
                message: "Lab Test not found",
            });
        }

    }
    catch (error) {
        return res.status(400).json({
            message: "Server error",
            data: error.message

        });

    }
}


