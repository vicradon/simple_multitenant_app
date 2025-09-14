class MedicalRecordService {
  async getRecords(db) {
    const { rows } = await db.query("SELECT * FROM medical_record");
    return rows;
  }

  async createRecord(db, { patientName, doctorName, diagnosis }) {
    const { rows } = await db.query(
      `INSERT INTO medical_record ("patientName", "doctorName", "diagnosis") VALUES ($1, $2, $3) RETURNING *`,
      [patientName, doctorName, diagnosis]
    );

    return rows[0];
  }
}

export default new MedicalRecordService();
