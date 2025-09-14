import { MedicalRecord } from "../entities/MedicalRecord";
import { DataSource } from "typeorm";

interface CreateMedicalRecord {
  patientName: string;
  doctorName: string;
  diagnosis: string;
}

class MedicalRecordService {
  async getRecords(db: DataSource) {
    const records = await db.getRepository(MedicalRecord).find();
    return records;
  }

  async createRecord(db: DataSource, payload: CreateMedicalRecord) {
    const { patientName, doctorName, diagnosis } = payload;
    const record = db
      .getRepository(MedicalRecord)
      .create({ patientName, doctorName, diagnosis });
    await db.getRepository(MedicalRecord).save(record);
    return record;
  }
}

export default new MedicalRecordService();
