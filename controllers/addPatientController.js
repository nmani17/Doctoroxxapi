//const Patient = require('../models/addPatient');
//const Visit = require('../models/addPurposeofvisit');
const { m_patient_mastercollection } = require("../models/patientMaster");
const { m_patientCollection } = require("../models/addPatient");
const { m_visitCollection } = require("../models/addPurposeofvisit");
const {Addcomplaints} = require('../models/addcomplaints'); 
const { ObjectId } = require('mongodb');
const moment = require('moment-timezone');
const addcomplaints = require("../models/addcomplaints");


exports.addPatientOrVisit_old = async (req, res) => {

    try {
        console.log('Entered in to a fucntion');
        console.log(req.body);
        const {
            patientId,
            clinicId,
            DoctorId,
            Doctor_name,
            DoctorSpecality,
            mobile,
            patientName,
            age_in_year,
            age_in_month,
            sex,
            dob,
            guardian_name,
            location,
            purpose_of_visit,
            other,
            height,
            weight,
            BP,
            pulse,
            temp,
            sugar,
        } = req.body;

        let patient;

        if (patientId) {
            patient = await Patient.findById(patientId);

            if (!patient) {
                return res.status(404).json({
                    error: `No patient found with ID ${patientId}.`
                });
            }

            patient.last_visit = new Date();
            patient.visit_count += 1;
            await patient.save();
        } else {
            patient = new Patient({
                clinicId,
                DoctorId,
                Doctor_name,
                DoctorSpecality,
                mobile,
                patientName,
                first_visit: new Date(),
                last_visit: new Date(),
                visit_count: 1,
                createdDate: new Date()
            });

            await patient.save();
        }

        const newVisit = new Visit({
            patientId: patient._id,
            clinic_id: clinicId,
            DoctorId,
            Doctor_name,
            mobile: patient.mobile,
            patientName: patient.patientName,
            age_in_year,
            age_in_month,
            sex,
            DOB: dob,
            Guardian_name: guardian_name,
            location,
            purpose_of_visit,
            other,
            height,
            weight,
            BP,
            pulse,
            temp,
            sugar,
            visitDate: new Date(),
            createdDate: new Date()
        });

        await newVisit.save();

        res.status(201).json({
            message: 'Patient and visit added successfully.',
            patient,
            visit: newVisit
        });
    } catch (error) {
        console.error('Error adding patient or visit:', error);
        res.status(500).json({ error: 'Failed to add patient or visit.' });
    }
};

exports.addPatientOrVisit = async (req, res) => {

    try {
        const {
            clinic_id,
            patient_id,
            mobile,
            patientName,
            doctorId,
            doctor_name,
            doctorSpecality,
            age_in_year,
            age_in_month,
            sex,
            Dob,
            guardian_name,
            location,
            purpose_of_visit,
            other,
            height,
            weight,
            bp,
            pulse,
            temp,
            sugar,
        } = req.body;



        let mobileid
        await m_patient_mastercollection.findOne({ mobile: req.body.mobile }).then(async (data) => {
            if (data) {
                mobileid = data._id
                console.log("mobile id", mobileid);
            } else {
                const new_m_patient_master = new m_patient_mastercollection({
                    clinic_id: clinic_id,
                    mobile: mobile
                });
                let m_patient_master = await new_m_patient_master.save();
                mobileid = m_patient_master._id
            }

        })


        if (!req.body.patient_id) {
            console.log(mobileid, "mobileid");


            const new_m_patient = new m_patientCollection({
                clinic_id: clinic_id,
                patient_master_id: mobileid,
                mobile: mobile,
                patientName: patientName,
                doctorId: doctorId,
                doctor_name: doctor_name,
                doctorSpecality: doctorSpecality

            });

            let mpatientdata = await new_m_patient.save();

            const new_m_visit = new m_visitCollection({

                patient_id: mpatientdata._id,
                clinic_id: clinic_id,
                patient_master_id: mobileid,
                mobile: mobile,
                patientName: patientName,
                doctorId: doctorId,
                doctor_name: doctor_name,
                age_in_year: age_in_year,
                age_in_month: age_in_month,
                sex: sex,
                Dob: Dob,
                guardian_name: guardian_name,
                location: location,
                purpose_of_visit: purpose_of_visit,
                other: other,
                height: height,
                weight: weight,
                bp: bp,
                pulse: pulse,
                temp: temp,
                sugar: sugar,
            });
            await new_m_visit.save();

            return res.status(200).json({
                message: "First Visit Sucessfully created",
                data: new_m_patient
            });
        } else {
            // const result = await m_patientCollection.updateOne(
            //     { _id: new ObjectId(req.body.patient_id) },
            //     { $inc: { visit_count: 1 } } ,

            // );
            const result = await m_patientCollection.updateOne(
                { _id: new ObjectId(req.body.patient_id) },
                {
                    $inc: { visit_count: 1 },
                    $set: { last_visit: moment().tz('Asia/Kolkata').format('YYYY-MM-DD h:mm A') }
                }
            );

            const new_m_visit = new m_visitCollection({

                patient_id: patient_id,
                clinic_id: clinic_id,
                patient_master_id: mobileid,
                mobile: mobile,
                patientName: patientName,
                doctorId: doctorId,
                doctor_name: doctor_name,
                age_in_year: age_in_year,
                age_in_month: age_in_month,
                sex: sex,
                Dob: Dob,
                guardian_name: guardian_name,
                location: location,
                purpose_of_visit: purpose_of_visit,
                other: other,
                height: height,
                weight: weight,
                bp: bp,
                pulse: pulse,
                temp: temp,
                sugar: sugar,
            });
            await new_m_visit.save();
            return res.status(200).json({
                message: "data updated and saved successfully successfully",
                data: new_m_visit

            });
        }

    }
    catch (error) {
        return res.status(400).json({
            message: "Server Error",
            data: error.message

        });
    }
};


exports.getPatientsByMobile_old = async (req, res) => {
    try {
        const { mobile } = req.query;

        console.log('this is mobile ', mobile);

        const patients = await Patient.find({ mobile });

        if (!patients || patients.length === 0) {
            return res.status(404).json({
                error: `No patients found with mobile number ${mobile}.`
            });
        }

        const patientsWithVisits = await Promise.all(
            patients.map(async (patient) => {
                const visits = await Visit.find({ patientId: patient._id });
                return {
                    ...patient._doc,
                    visits,
                };
            })
        );

        res.status(200).json({
            message: 'Patients fetched successfully.',
            patients: patientsWithVisits
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients.' });
    }
};

exports.getPatientsByMobile = async (req, res) => {
    try {
        const { mobile } = req.query;

        if (!mobile) {
            return res.status(400).json({
                message: "Required Mobile Number",
                data: "Enter the mobile number",
            });
        }

        const all_patient_details = await m_patientCollection.find({ mobile });

        if (all_patient_details.length === 0) {
            return res.status(404).json({
                message: "Mobile number not found",
                data: "No records found for the given mobile number",
            });
        }

        const visitDetails = await m_visitCollection.find({ mobile });

        const patientVisits = all_patient_details.map((patient) => {
            const visits = visitDetails.filter(
                (visit) => visit.patient_id === patient._id.toString()
            );

            return {
                ...patient._doc,
                visits: visits.map((visit) => ({
                    ...visit._doc,
                })),

            };
        });

        res.status(200).json({
            message: "Success",
            data: patientVisits,
        });
    } catch (error) {
        console.error("Error fetching patient and visit details:", error);
        return res.status(500).json({
            message: "Server error",
            data: error.message,
        });
    }
};

exports.getPatientsByClinicId = async (req, res) => {
    try {
        const { clinicId } = req.query;

        console.log("Fetching data for clinicId: ", clinicId);

        if (!clinicId) {
            return res.status(400).json({
                message: "Required Clinic ID",
                data: "Enter the clinic ID",
            });
        }

        const all_patient_details = await m_patientCollection.find({ clinic_id: clinicId });

        if (all_patient_details.length === 0) {
            return res.status(404).json({
                message: "Clinic ID not found",
                data: "No records found for the given clinic ID",
            });
        }

        const visitDetails = await m_visitCollection.find({ clinic_id: clinicId });

        const patientVisits = all_patient_details.map((patient) => {
            const patientVisitsData = visitDetails
                .filter((visit) => visit.patient_id === patient._id.toString())
                .map((visit) => ({
                    patient_id: patient._id,
                    patient_master_id: patient.patient_master_id,
                    patientName: patient.patientName,
                    mobile: patient.mobile,
                    clinic_id: patient.clinic_id,
                    visit_count: patient.visit_count,
                    first_visit: patient.first_visit,
                    last_visit: patient.last_visit,
                    doctorId: visit.doctorId || '',
                    doctor_name: visit.doctor_name || '',
                    doctorSpecality: visit.doctorSpecality || '',
                    visit_details: {
                        ...visit._doc, 
                    }
                }));

            return patientVisitsData;
        }).flat(); 

        res.status(200).json({
            message: "Success",
            data: patientVisits,
        });
    } catch (error) {
        console.error("Error fetching patient and visit details:", error);
        return res.status(500).json({
            message: "Server error",
            data: error.message,
        });
    }
};


exports.getPatientHistory = async (req, res) => {
    try {
        const { patientId } = req.query; 
        console.log("patient",patientId );
        // console.log("m_visitCollection:", m_visitCollection);
        // console.log("Addcomplaints:", Addcomplaints);

        if (!patientId) {
            return res.status(400).json({
                message: "Patient ID is required",
            });
        }

        
        const visits = await m_visitCollection.find({ patient_id: patientId });  //find the visit id using patientid
            console.log("visit",visits);
        if (!visits || visits.length === 0) {
            return res.status(404).json({
                message: "No visits found for this patient.",
            });
        }


        const history = await Promise.all(
            visits.map(async (visit) => {
             
                const prescriptions = await addcomplaints.find({ visitId: visit._id });
                console.log("presciption",prescriptions);

                return {
                    visitDetails: visit,
                    prescriptions: prescriptions,
                };
            })
        );

      
        res.status(200).json({
            message: "Success",
            data: {
                patientId,
                history,
            },
        });
    }catch (error) {
        console.error("Error fetching patient history details", error);
        return res.status(500).json({
            message: "Server error",
            data: error.message,
        });
    }
}

