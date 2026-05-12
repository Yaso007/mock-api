const pool = require("../config/db");

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
      display_status,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO fir_registry (

        police_station_code,
        law_enforcement_agency,
        national_code,
        last_fir_no,
        last_fir_year,
        last_charge_sheet_date,
        district,
        taluk,
        law_enforcement_type,
        display_status,
        created_by

      )

      VALUES (
        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,$10,
        $11
      )

      RETURNING *
      `,
      [
        police_station_code,
        law_enforcement_agency,
        national_code,
        last_fir_no,
        last_fir_year,
        last_charge_sheet_date,
        district,
        taluk,
        law_enforcement_type,
        display_status,
        req.user.id,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to create FIR entry",
    });
  }
};

// GET ALL FIR
const getAllFIRs = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM fir_registry

      ORDER BY id DESC
      `,
    );

    res.json(result.rows);
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
