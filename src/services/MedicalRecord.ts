import { MedicalRecord } from "../entities/MedicalRecord";

class MedicalRecordService {
  async getRecords(db) {
    const records = await db.getRepository(MedicalRecord).find();
    return records;
  }

  async createRecord(db, { patientName, doctorName, diagnosis }) {
    const record = db.getRepository(MedicalRecord).create({ patientName, doctorName, diagnosis });
    await db.getRepository(MedicalRecord).save(record);
    return record;
  }
}

export default new MedicalRecordService();
