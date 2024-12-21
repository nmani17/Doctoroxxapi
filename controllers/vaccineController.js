
const { vaccineCollection } = require("../models/vaccine");
const { response } = require("express");
const { ObjectId } = require('mongodb');



exports.getvaccine = async (req, res) => {
    try {

        // const { id } = req.query;

        const vaccineData = await vaccineCollection.findOne({
            _id: new ObjectId("675a831c5b9cb391d49460b8")
        });
        if (vaccineData) {
            return res.status(200).json({
                message: "sucess",
                data: vaccineData

            });
        }

    }
    catch (error) {
        return res.status(400).json({
            message: "server error",
            data: error.message

        });

    }
}

exports.vaccine = async (req, res) => {
    try {

        const saveVaccine = new vaccineCollection({

            "vaccines": [
                {
                    "id": 1,
                    "age": "At Birth",
                    "vaccines": [
                        "BCG",
                        "OPV",
                        "Hepatitis B-1 (BD)"
                    ]
                },
                {
                    "id": 2,
                    "age": "6 Weeks",
                    "vaccines": [
                        "DTPw/DTaP-1",
                        "IPV-1",
                        "Hib-1",
                        "Hep B-2",
                        "PCV-1",
                        "Rotavirus-1"
                    ]
                },
                {
                    "id": 3,
                    "age": "10 Weeks",
                    "vaccines": [
                        "DTPw/DTaP-2",
                        "IPV-2",
                        "Hib-2",
                        "Hep B-3",
                        "PCV-2",
                        "Rotavirus-2"
                    ]
                },
                {
                    "id": 4,
                    "age": "14 Weeks",
                    "vaccines": [
                        "DTPw/DTaP-3",
                        "IPV-3",
                        "Hib-3",
                        "Hep B-4",
                        "PCV-3",
                        "Rotavirus-3"
                    ]
                },
                {
                    "id": 5,
                    "age": "6 Months",
                    "vaccines": [
                        "Influenza (TIV-1)"
                    ]
                },
                {
                    "id": 6,
                    "age": "6–9 Months",
                    "vaccines": [
                        "Typhoid Conjugate Vaccine"
                    ]
                },
                {
                    "id": 7,
                    "age": "9 Months",
                    "vaccines": [
                        "MMR-1"
                    ]
                },
                {
                    "id": 8,
                    "age": "12 Months",
                    "vaccines": [
                        "Hepatitis A"
                    ]
                },
                {
                    "id": 9,
                    "age": "13 Months",
                    "vaccines": [
                        "MMR-2",
                        "Varicella-1",
                        "PCV Booster"
                    ]
                },
                {
                    "id": 10,
                    "age": "15 Months",
                    "vaccines": [
                        "DTPw/DTaP-B2",
                        "IPV-B1"
                    ]
                },
                {
                    "id": 11,
                    "age": "16–18 Months",
                    "vaccines": [
                        "Hep A-2"
                    ]
                },
                {
                    "id": 12,
                    "age": "4–6 Years",
                    "vaccines": [
                        "Varicella-2",
                        "DTPw/DTaP-B2",
                        "IPV-B2"
                    ]
                },
                {
                    "id": 13,
                    "age": "10–12 Years",
                    "vaccines": [
                        "Tdap"
                    ]
                },
                {
                    "id": 14,
                    "age": "15–18 Years",
                    "vaccines": [
                        "HPV"
                    ]
                },
                {
                    "id": 15,
                    "age": "15 Months and Above",
                    "vaccines": [
                        "Cholera (as needed)"
                    ]
                }
            ]


        })

        saveVaccine.save();
        return res.status(200).json({
            message: "sucess",
            data: saveVaccine

        })



    }
    catch (error) {
        return res.status(400).json({
            error: 'Server Error',
            data: error.message

        });

    }
}