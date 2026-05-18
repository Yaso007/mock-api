const pool = require("../config/db");
const {
  createFIRRecord,
  getAllFIRRecords,
  getFIRById,
  updateFIRRecord,
  deleteFIRRecord,
} = require("../services/firService");

// CREATE FIR
const createFIR = async (req, res) => {
  try {
    const {
      police_station_code,
      law_enforcement_agency,
      national_code,
      last_fir_no,
      last_fir_year,
      last_charge_sheet_date,
      district,
      taluk,
      law_enforcement_type,
      display,
    } = req.body;

    const result = await createFIRRecord({
      police_station_code,
      law_enforcement_agency,
      national_code,
      last_fir_no,
      last_fir_year,
      last_charge_sheet_date,
       district,
      taluk,
      law_enforcement_type,
      display,
      created_by: req.user.id,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to create FIR entry",
      "error": err,
    });
  }
};

// GET ALL FIR
const getAllFIRs = async (req, res) => {
  try {
    const result = await getAllFIRRecords();
    res.json(result);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch FIR records",
    });
  }
};

const getFIR= async (req,res) =>{
  const record = await getFIRById(req.params.id);
  if (!record) {
    return res.status(404).json({ message: "FIR record not found" });
  }
  res.json(record);
}

const updateFIR = async (req, res) =>{
  const updatedRecord = await updateFIRRecord(req.params.id, req.body);
  if (!updatedRecord) {
    return res.status(404).json({ message: "FIR record not found" });
  }
  res.json(updatedRecord);
}

const deleteFIR = async (req, res) =>{
  const deletedRecord = await deleteFIRRecord(req.params.id);
  if (!deletedRecord) {
    return res.status(404).json({ message: "FIR record not found" });
  }
  res.json({ message: "FIR record deleted successfully" });
}

module.exports = {
  createFIR,
  getAllFIRs,
  getFIR,
  updateFIR,
  deleteFIR,
};

