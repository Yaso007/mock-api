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

module.exports = {
  createFIR,
  getAllFIRs,
};
