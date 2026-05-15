const pool = require("../config/db");


/*
  Create FIR entry.
*/
const createFIRRecord = async ({
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
  created_by,
}) => {

  /*
    Insert FIR record.

    RETURNING * gives inserted row.
  */
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
      display,
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
      display,
      created_by,
    ]
  );

  return result.rows[0];
};


/*
  Fetch all FIR records.
*/
const getAllFIRRecords =
  async () => {

    const result =
      await pool.query(
        `
        SELECT *
        FROM fir_registry

        ORDER BY id DESC
        `
      );

    return result.rows;
  };


/*
  Fetch FIR by ID.
*/
const getFIRById = async (id) => {

  const result =
    await pool.query(
      `
      SELECT *
      FROM fir_registry
      WHERE id = $1
      `,
      [id]
    );

  return result.rows[0];
};


/*
  Update FIR record.
*/
const updateFIRRecord =
  async (
    id,
    updatedData
  ) => {

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
    } = updatedData;


    const result =
      await pool.query(
        `
        UPDATE fir_registry

        SET
          police_station_code = $1,
          law_enforcement_agency = $2,
          national_code = $3,
          last_fir_no = $4,
          last_fir_year = $5,
          last_charge_sheet_date = $6,
          district = $7,
          taluk = $8,
          law_enforcement_type = $9,
          display_status = $10

        WHERE id = $11

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
          id,
        ]
      );

    return result.rows[0];
  };


/*
  Delete FIR record.
*/
const deleteFIRRecord =
  async (id) => {

    const result =
      await pool.query(
        `
        DELETE FROM fir_registry
        WHERE id = $1

        RETURNING *
        `,
        [id]
      );

    return result.rows[0];
  };


module.exports = {
  createFIRRecord,
  getAllFIRRecords,
  getFIRById,
  updateFIRRecord,
  deleteFIRRecord,
};