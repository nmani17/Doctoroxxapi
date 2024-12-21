const Addcomplaints = require('../models/addcomplaints'); // Make sure to import the model

exports.addcomplaints_old = async (req, res) => {
    try {
        console.log('Entered into the function');
        console.log(req.body);

        const {
            patientId,
            clinicId,
            DoctorId,
            complaints,
            diagnosis,
            prescription,
        } = req.body;

        const newComplaint = new Addcomplaints({
            patientId,
            clinicId,
            DoctorId,
            complaints,
            Diagnosis: diagnosis,
            prescription,
        });

        await newComplaint.save();

        res.status(201).json({
            message: 'Complaint and prescription added successfully!',
            complaint: newComplaint,
        });
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).json({ error: 'Failed to add complaint and prescription' });
    }
};


exports.addcomplaints = async (req, res) => {
    try {
        console.log('Entered into the function');
        console.log(req.body);

        const {
            patient_id,
            clinic_id,
            doctorId,
            patient_master_id,
            visitId,
            complaints,
            diagnosis,
            prescription,
            labtest,
        } = req.body;

        const newComplaint = new Addcomplaints({
            patient_id,
            clinic_id,
            doctorId,
            patient_master_id,
            visitId,
            complaints,
            Diagnosis: diagnosis,
            prescription,
            labtest
        });

        await newComplaint.save();

        res.status(201).json({
            message: 'Complaint and prescription added successfully!',
            complaint: newComplaint,
        });
    } catch (error) {
        console.error('Error adding complaint:', error);
        res.status(500).json({ error: 'Failed to add complaint and prescription' });
    }
};


exports.get_add_complaints = async(req,res)=>{
    try{
        let{visitId}=req.query;
        let visit=await Addcomplaints.find({visitId});
        
        console.log("data",visit);
    

        return res.status(200).json({
            sucess:"Sucess",
            data:visit
        })

    }
    catch(error){
        return res.status(400).json({
            message:"Server error",
            data:error.message
        })
    }
}
exports.update_complaints = async (req, res) => {
    try {
        const {
            patient_id,
            clinic_id,
            doctorId,
            patient_master_id,
            visitId,
            complaints,
            diagnosis,
            prescription,
            labtest,
        } = req.body;

       
        let visitdata = await Addcomplaints.findOne({ visitId });

        console.log(visitdata);

        if (!visitdata) {
            return res.status(404).json({
                error: 'Patient not found.',
            });
        }

      
        if (patient_id) visitdata.patient_id = patient_id;
        if (clinic_id) visitdata.clinic_id = clinic_id;
        if (doctorId) visitdata.doctorId = doctorId;
        if (patient_master_id) visitdata.patient_master_id = patient_master_id;
        if (complaints) visitdata.complaints = complaints;
        if (diagnosis) visitdata.diagnosis = diagnosis;
        if (prescription) visitdata.prescription = prescription;
        if (labtest) visitdata.labtest = labtest;

        
        visitdata.createdDate = new Date();

       
        await visitdata.save();

        return res.status(200).json({
            response: "Succeeded",
            message: "Updated successfully.",
        });
    } catch (error) {
        console.error("Error updating complaints:", error);
        return res.status(400).json({
            message: "Server error",
            data: error.message,
        });
    }
};




